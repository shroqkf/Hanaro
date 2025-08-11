package com.hana7.hanaro.domain.cartItem.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemUpdateRequestDTO {
	private Long cartItemId;
	private int quantity;
}
