package com.hana7.hanaro.common.security.sevice;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import com.hana7.hanaro.domain.user.dto.UserDTO;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserDetailServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("loadUserByUsername called with username: {}", username);
		try {
			User user = userRepository.findByEmail(username).orElse(null);

			if(user == null){
				log.warn("User not found for username: {}", username);
				throw new UsernameNotFoundException(username);
			}

			log.info("User found: {}", user.getEmail());
			List<String> roleNames = (user.getRole() != null) ? List.of(user.getRole().name()) : List.of("ROLE_USER"); // 기본 역할 설정
			return new UserDTO(user.getEmail(), user.getPassword(), user.getName(), roleNames);
		} catch (Exception e) {
			log.error("Error loading user by username: {}", username, e);
			throw new UsernameNotFoundException("Error loading user", e);
		}
	}
}
