package com.hana7.hanaro.domain.cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.entity.CartItem;
import com.hana7.hanaro.domain.item.entity.Item;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	List<CartItem> findByItem(Item itemToDelete);

	List<CartItem> findByCart(Cart cart);
}
