package com.hana7.springdemo.jpa.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ReplyResponseDTO {
	private int id;
	private String reply;
	private MemberDTO replyer;

	@JsonBackReference
	private BoardResponseDTO board;
}
