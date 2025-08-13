package com.hana7.hanaro.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class OrderCreationException extends RuntimeException {
    public OrderCreationException() {
        super("주문 생성 중 오류가 발생했습니다.");
    }

    public OrderCreationException(String message) {
        super(message);
    }
}
