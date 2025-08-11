package com.hana7.hanaro.common.security.exception;

public class CustomJwtException extends RuntimeException {
	public CustomJwtException(String msg) {
		super("JwtErr:" + msg);
	}
}
