package com.hana7.hanaro.domain.cart.dto;

import java.util.List;

import com.hana7.hanaro.domain.cartItem.dto.CartItemResponseDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartResponseDTO {
	private Long cartId;
	private Long userId;
	private List<CartItemResponseDTO> cartItems;
}
