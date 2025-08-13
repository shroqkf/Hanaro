package com.hana7.hanaro.domain.order.entity;

import com.hana7.hanaro.common.exception.NotFoundException;

public enum OrderState {
	PAID, PREPARING, PROCESSING, COMPLETED;

	public OrderState getNextState() {
		return switch (this) {
			case PAID -> PREPARING;
			case PREPARING -> PROCESSING;
			case PROCESSING -> COMPLETED;
			default -> throw new NotFoundException("다음 상태를 찾지 못했습니다: " + this);
		};
	}

	public int stateInterval() {
		return switch (this) {
			case PAID -> 5;
			case PREPARING -> 15;
			case PROCESSING -> 60;
			default -> -1;
		};
	}
}
