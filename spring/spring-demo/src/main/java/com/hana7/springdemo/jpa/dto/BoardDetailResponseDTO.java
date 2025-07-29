package com.hana7.springdemo.jpa.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardDetailResponseDTO extends BoardResponseDTO {
	private String content;

	BoardDetailResponseDTO(int id, String title, String writer, int hit, LocalDateTime createdAt,
		LocalDateTime updatedAt,
		String content) {
		super(id, title, writer, hit, createdAt, updatedAt, content);
	}
}
