package com.hana7.hanaro.domain.user.dto;

import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.user.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDTO {
	private Long id;

	@NotNull
	@Size(min = 2, max = 50, message = "이름은 2글자 이상 50자 이하입니다.")
	private String name;

	@NotBlank
	@Email
	private String email;

	private UserRole role;

	public static UserResponseDTO from(User user) {
		return UserResponseDTO.builder()
			.id(user.getId())
			.name(user.getName())
			.email(user.getEmail())
			.role(user.getRole())
			.build();
	}

}
