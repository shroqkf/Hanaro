package com.hana7.hanaro.common.exception;

import org.springframework.http.HttpStatus;

public class ItemDeleteBadRequestException extends GlobalException {
	public ItemDeleteBadRequestException() {
		super(HttpStatus.BAD_REQUEST, "상품 삭제에 실패했습니다.");
	}
}
