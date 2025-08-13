package com.hana7.hanaro.domain.cart.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class CartRepositoryTest extends RepositoryTest {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	private User testUser;

	@BeforeEach
	void setUp() {
		testUser = User.builder()
			.name("장바구니_테스트유저")
			.email("cartuser@example.com")
			.password("password")
			.role(UserRole.ROLE_USER)
			.build();
		userRepository.save(testUser);
	}

	@Test
	@DisplayName("장바구니 저장 테스트")
	void saveCartTest() {
		Cart newCart = Cart.builder()
			.user(testUser)
			.build();

		Cart savedCart = cartRepository.save(newCart);

		assertThat(savedCart.getId()).isNotNull();
		assertThat(savedCart.getUser().getId()).isEqualTo(testUser.getId());
	}

	@Test
	@DisplayName("사용자 ID로 장바구니 조회 테스트")
	void findByUserIdTest() {
		Cart newCart = Cart.builder()
			.user(testUser)
			.build();
		cartRepository.save(newCart);

		Cart foundCart = cartRepository.findByUserId(testUser.getId()).orElseThrow();

		assertThat(foundCart.getId()).isEqualTo(newCart.getId());
		assertThat(foundCart.getUser().getEmail()).isEqualTo(testUser.getEmail());
	}
}
