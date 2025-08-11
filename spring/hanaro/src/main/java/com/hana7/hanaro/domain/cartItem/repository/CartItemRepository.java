package com.hana7.hanaro.domain.cartItem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cartItem.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByCart(Cart cart);
}
