package com.hana7.hanaro.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GlobalException extends RuntimeException {
	private final HttpStatus httpStatus;
	private final String message;

	public GlobalException(HttpStatus httpStatus, String message) {
		this.httpStatus = httpStatus;
		this.message = message;
	}
}
