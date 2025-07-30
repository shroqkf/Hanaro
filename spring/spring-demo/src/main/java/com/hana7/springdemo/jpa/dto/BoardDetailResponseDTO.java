package com.hana7.springdemo.jpa.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter @Setter
@SuperBuilder
public class BoardDetailResponseDTO extends BoardResponseDTO {
	private String content;

	@JsonManagedReference
	private List<ReplyResponseDTO> replies;
}
