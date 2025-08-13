package com.hana7.hanaro.domain.cart.dto;

import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.entity.CartItem;
import com.hana7.hanaro.domain.item.entity.Item;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemRequestDTO {
	@NotNull(message = "상품 ID는 필수입니다.")
	private Long itemId;

	@Min(value = 1, message = "수량은 1개 이상이어야 합니다.")
	private Integer quantity;

	public CartItem toEntity(Cart cart, Item item){
		return CartItem.builder()
			.cart(cart)
			.item(item)
			.quantity(quantity)
			.build();
	}
}
