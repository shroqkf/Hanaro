package com.hana7.hanaro.common.security.exception;

import com.hana7.hanaro.common.exception.NotFoundException;

public class UserNotFoundException extends NotFoundException {
	public UserNotFoundException() {
		super("회원을 찾을 수 없습니다.");
	}
}
