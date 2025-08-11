package com.hana7.hanaro.common.exception;

public class UserNotFoundException extends NotFoundException {
	public UserNotFoundException() {
		super("회원을 찾을 수 없습니다.");
	}
}
