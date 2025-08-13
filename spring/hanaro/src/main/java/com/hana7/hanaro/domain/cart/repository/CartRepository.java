package com.hana7.hanaro.domain.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.user.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	@Query("SELECT c FROM Cart c "
		+ "LEFT JOIN FETCH c.cartItems ci "
		+ "LEFT JOIN FETCH ci.item WHERE c.user = :user")
	Optional<Cart> findByUser(User user);

	Optional<Cart> findByUserId(Long id);
}
