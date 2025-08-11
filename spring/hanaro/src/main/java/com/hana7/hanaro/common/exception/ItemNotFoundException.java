package com.hana7.hanaro.common.exception;

public class ItemNotFoundException extends NotFoundException {
	public ItemNotFoundException() {
		super("상품을 찾을 수 없습니다.");
	}
}
