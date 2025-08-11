package com.hana7.hanaro.common.exception;

public class CartBadRequestException extends RuntimeException {
	public CartBadRequestException() {
		super("잘못된 요청입니다.");
	}
}
