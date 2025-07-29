package com.hana7.springdemo.jpa.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter @Setter
public class BoardResponseDTO {
	private int id;
	private String title;
	private String writer;
	private int hit;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private String content;
}
