package com.hana7.hanaro.domain.item.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemDetailResponseDTO {

	private Long id;
	private String itemName;
	private int price;
	private int stock;
	private List<String> imageUrls;
}
