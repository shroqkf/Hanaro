package com.hana7.springdemo.jpa.dto;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

import lombok.Getter;

@Getter
public class PageResponseDTO<DTO, EN> {
	private final List<DTO> dtoList;

	public PageResponseDTO(Page<EN> results, Function<EN, DTO> fn) {
		this.dtoList = results.stream().map(fn).collect(Collectors.toList());
	}
}
