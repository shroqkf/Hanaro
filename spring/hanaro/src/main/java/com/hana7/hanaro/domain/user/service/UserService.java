package com.hana7.hanaro.domain.user.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hana7.hanaro.common.exception.NotFoundException;
import com.hana7.hanaro.common.security.JwtUtil;
import com.hana7.hanaro.common.security.exception.UserNotFoundException;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.repository.CartRepository;
import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.user.dto.UserLoginRequestDTO;
import com.hana7.hanaro.domain.user.dto.UserRequestDTO;
import com.hana7.hanaro.domain.user.dto.UserResponseDTO;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional // 메서드 실행 시 트랜잭션 적용
public class UserService {

	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final PasswordEncoder passwordEncoder;
	private final OrderRepository orderRepository;

	// 회원가입
	public Long signUp(UserRequestDTO request) {
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
		}

		String encodedPassword = passwordEncoder.encode(request.getPassword());

		User newUser = User.builder()
			.email(request.getEmail())
			.password(encodedPassword)
			.name(request.getName())
			.role(UserRole.ROLE_USER)
			.build();

		userRepository.save(newUser);

		Cart newCart = Cart.builder()
			.user(newUser)
			.build();
		cartRepository.save(newCart);

		return newUser.getId();
	}

	// 로그인
	public String login(UserLoginRequestDTO request) {
		User user = userRepository.findByEmail(request.getName())
			.orElseThrow(() -> new NotFoundException("가입되지 않은 이메일입니다."));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new NotFoundException("잘못된 비밀번호입니다.");
		}

		Map<String, Object> claims = Map.of(
			"id", user.getId(),
			"email", user.getEmail(),
			"role", user.getRole().name()
		);

		String accessToken = JwtUtil.generateToken(claims, 30);

		return accessToken;
	}

	@Transactional(readOnly = true)
	public UserResponseDTO getUserById(Long id) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다. id=" + id));

		return UserResponseDTO.from(user);
	}

	// 모든 사용자 조회 (관리자용)
	@Transactional(readOnly = true)
	public List<UserResponseDTO> getAllUsers() {
		return userRepository.findAll().stream()
			.map(UserResponseDTO::from)
			.collect(Collectors.toList());
	}

	// 사용자 삭제 (관리자용)
	public void deleteUser(Long id) {
		User userToDelete = userRepository.findById(id)
			.orElseThrow(UserNotFoundException::new);

		userRepository.delete(userToDelete);
	}
}
