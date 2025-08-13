package com.hana7.hanaro.domain.cart.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemResponseDTO {
	private Long cartItemId;
	private Long itemId;
	private String itemName;
	private long price;
	private int quantity;
}
