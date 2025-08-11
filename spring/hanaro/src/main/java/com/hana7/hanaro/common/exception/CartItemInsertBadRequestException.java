package com.hana7.hanaro.common.exception;

import org.apache.coyote.BadRequestException;

public class CartItemInsertBadRequestException extends BadRequestException {
	public CartItemInsertBadRequestException() {
		super("장바구니 상품 생성에 문제가 있습니다.");
	}
}
