package com.hana7.springdemo.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Post {
	private int id;

	@NotNull
	@Size(min=1, max=50, message="제목은 1글자 이상 50자 이하입니다")
	private String title;

	@Past
	private LocalDateTime createdAt;

	private int writer;
	private User user;

	@NotBlank
	private String content;

}
