package com.hana7.hanaro.domain.order.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class OrderRequestDTO {
	@NotEmpty
	private List<Line> items;

	@Getter public static class Line {
		@NotNull private Long productId;
		@NotNull @Positive
		private Integer quantity;
	}
}
