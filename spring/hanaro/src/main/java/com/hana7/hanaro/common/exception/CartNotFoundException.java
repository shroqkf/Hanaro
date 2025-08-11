package com.hana7.hanaro.common.exception;

public class CartNotFoundException extends NotFoundException {
	public CartNotFoundException() {
		super("장바구니를 찾을 수 없습니다.");
	}
}
