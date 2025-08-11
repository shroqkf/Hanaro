package com.hana7.hanaro.domain.user.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Commit;

import static org.assertj.core.api.Assertions.assertThat;

class UserRepositoryTest extends RepositoryTest {

	@Autowired
	private UserRepository userRepository;

	private User testUser;

	@BeforeEach
	void setUp() {
		testUser = User.builder()
			.name("테스트유저")
			.email("test@gmail.com")
			.password("testPassword")
			.role(UserRole.ROLE_USER)
			.build();
	}

	@Test
	@DisplayName("사용자 저장 및 ID로 조회 테스트")
	@Commit
	void saveAndFindByIdTest() {
		// when: 사용자를 저장
		User savedUser = userRepository.save(testUser);

		// then: 저장된 사용자를 ID로 다시 조회하여 검증
		User foundUser = userRepository.findById(savedUser.getId()).orElseThrow();

		assertThat(foundUser.getId()).isEqualTo(savedUser.getId());
		assertThat(foundUser.getEmail()).isEqualTo(testUser.getEmail());
		print(foundUser);
	}

	@Test
	@DisplayName("이메일로 사용자 조회 테스트")
	void findByEmailTest() {
		// give: 사용자를 미리 저장
		userRepository.save(testUser);

		// when: 이메일로 사용자를 조회
		User foundUser = userRepository.findByEmail(testUser.getEmail()).orElseThrow();

		// then: 조회된 사용자가 일치하는지 검증
		assertThat(foundUser.getEmail()).isEqualTo(testUser.getEmail());
		print(foundUser);
	}

	@Test
	@DisplayName("이메일 존재 여부 확인 테스트")
	void existsByEmailTest() {
		// give: 사용자를 미리 저장
		userRepository.save(testUser);

		// when & then
		// 존재하는 이메일 확인
		assertTrue(userRepository.existsByEmail("test@gmail.com"));
		// 존재하지 않는 이메일 확인
		assertFalse(userRepository.existsByEmail("wrong@gmail.com"));
	}
}
