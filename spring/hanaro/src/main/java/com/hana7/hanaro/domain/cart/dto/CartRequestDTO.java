package com.hana7.hanaro.domain.cart.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartRequestDTO {
	@NotNull(message = "장바구니 항목은 필수입니다.")
	@Valid
	private List<CartItemRequestDTO> items;
}
