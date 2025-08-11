package com.hana7.hanaro.domain.order.entity;

public enum OrderState {
	PAID, PREPARING, PROCESSING, COMPLETED;

	public OrderState getNextState() {
		return switch (this) {
			case PAID -> PREPARING;
			case PREPARING -> PROCESSING;
			case PROCESSING -> COMPLETED;
			default -> throw new IllegalStateException("Cannot determine next status for: " + this);
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
