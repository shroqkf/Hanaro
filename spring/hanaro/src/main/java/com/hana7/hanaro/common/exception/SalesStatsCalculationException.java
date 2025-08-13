package com.hana7.hanaro.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class SalesStatsCalculationException extends RuntimeException {
    public SalesStatsCalculationException() {
        super("매출 통계 계산 및 저장 중 오류가 발생했습니다.");
    }

    public SalesStatsCalculationException(String message) {
        super(message);
    }

    public SalesStatsCalculationException(String message, Throwable cause) {
        super(message, cause);
    }
}
