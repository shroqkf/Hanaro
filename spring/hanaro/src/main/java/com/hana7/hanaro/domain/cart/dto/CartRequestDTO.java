package com.hana7.hanaro.domain.cart.dto;

import java.util.List;

import com.hana7.hanaro.domain.cartItem.dto.CartItemRequestDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartRequestDTO {
	private Long userId;

	private List<CartItemRequestDTO> items;
}
