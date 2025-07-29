package com.hana7.springdemo.jpa.dto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor
public class PageRequestDTO {
	private int page;
	private int size;
	public PageRequestDTO() {
		this.page = 1;
		this.size = 10;
	}

	public Pageable getPageable() {
		return getPageable(this.page);
	}
	public Pageable getPageable(int page) {
		return getPageable(page, "id");
	}
	public Pageable getPageable(int page, String field) {
		return getPageable(page, Sort.by(Sort.Order.desc(field)));
	}
	public Pageable getPageable(int page, Sort sort) {
		return PageRequest.of(page - 1, size, sort);
	}
}
