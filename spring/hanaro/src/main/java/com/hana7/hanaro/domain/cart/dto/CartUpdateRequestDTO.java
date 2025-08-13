package com.hana7.hanaro.domain.cart.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartUpdateRequestDTO {
	private List<CartItemUpdateRequestDTO> cartItems;
}
