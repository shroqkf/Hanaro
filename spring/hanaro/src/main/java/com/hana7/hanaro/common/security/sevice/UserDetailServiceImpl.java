package com.hana7.hanaro.common.security.sevice;

import com.hana7.hanaro.domain.user.dto.UserDTO;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserDetailServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("username: {}", username);

		User user = userRepository.findByEmail(username)
			.orElseThrow(() -> {
				log.warn("사용자를 찾을 수 없습니다, username: {}", username);
				return new UsernameNotFoundException("해당 이메일의 사용자를 찾을 수 없습니다.");
			});

		log.info("사용자 찾음: {}", user.getEmail());

		// User 엔티티의 Role을 기반으로 권한 목록 생성
		List<String> roleNames = List.of(user.getRole().name());

		return new UserDTO(user.getEmail(), user.getPassword(), user.getName(), roleNames);
	}
}
