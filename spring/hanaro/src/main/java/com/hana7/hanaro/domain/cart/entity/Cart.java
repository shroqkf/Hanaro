package com.hana7.hanaro.domain.cart.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;

import com.hana7.hanaro.common.entity.BaseEntity;
import com.hana7.hanaro.domain.cartItem.entity.CartItem;
import com.hana7.hanaro.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Cart extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "bigint unsigned", unique = true)
	private Long id;

	private int quantity;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId", nullable = false)
	private User user;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default
	private List<CartItem> cartItems = new ArrayList<>();
}
