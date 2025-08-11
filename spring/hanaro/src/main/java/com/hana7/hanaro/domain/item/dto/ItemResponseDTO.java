package com.hana7.hanaro.domain.item.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemResponseDTO {

	private Long id;

	private String name;

	private int price;

	private int quantity;

}
