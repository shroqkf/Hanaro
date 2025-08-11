package com.hana7.hanaro.domain.item.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.hana7.hanaro.domain.item.entity.Item;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemRequestDTO {

	@NotBlank
	@Size(max=30)
	private String name;

	@NotNull
	private int price;

	@NotNull
	private int quantity;

	private List<MultipartFile> images;

	public Item toEntity(){
		return Item.builder()
			.name(name)
			.price(price)
			.quantity(quantity)
			.build();
	}

}
