package com.hana7.hanaro.domain.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.user.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUser(User user);

	Optional<Cart> findByUserId(Long id);
}
