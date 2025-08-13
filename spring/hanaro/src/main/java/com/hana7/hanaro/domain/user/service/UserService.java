package com.hana7.hanaro.domain.user.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import com.hana7.hanaro.common.exception.NotFoundException;
import com.hana7.hanaro.common.security.JwtUtil;
import com.hana7.hanaro.common.security.exception.UserNotFoundException;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.repository.CartRepository;
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

	// 회원가입
	public Long signUp(UserRequestDTO request) {
		if (userRepository.findByEmailAndDeletedAtIsNull(request.getEmail()).isPresent()) {
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

	

	@Transactional(readOnly = true)
	public UserResponseDTO getUserById(Long id) {
		User user = userRepository.findByIdAndDeletedAtIsNull(id)
			.orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다. id=" + id));

		return UserResponseDTO.from(user);
	}

	// 모든 사용자 조회 (관리자용)
	@Transactional(readOnly = true)
	public List<UserResponseDTO> getAllUsers() {
		return userRepository.findAllByDeletedAtIsNull().stream()
			.map(UserResponseDTO::from)
			.collect(Collectors.toList());
	}

	// 사용자 삭제 (관리자용)
	public void deleteUser(Long id) {
		userRepository.findByIdAndDeletedAtIsNull(id)
			.orElseThrow(UserNotFoundException::new);
		userRepository.softDeleteById(id, LocalDateTime.now());
	}
}
