package com.hana7.hanaro.domain.cartItem.dto;

import java.util.List;

import lombok.Data;

@Data
public class CartItemDeleteRequestDTO {
	List<Long> cartItemIds;
}
