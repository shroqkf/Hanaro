package com.hana7.hanaro.domain.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemUpdateRequestDTO {
	@NotNull(message = "장바구니 상품 ID는 필수입니다.")
	private Long cartItemId;

	@NotNull(message = "수량은 필수입니다.")
	@Min(value = 1, message = "수량은 1개 이상이어야 합니다.")
	private int quantity;
}
