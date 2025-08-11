package com.hana7.hanaro.domain.user.dto;

import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.user.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDTO {
	@NotBlank(message = "이메일은 필수 입력값입니다.")
	@Email(message = "유효한 이메일 형식이 아닙니다.")
	private String email;

	@NotBlank(message = "비밀번호는 필수 입력값입니다.")
	@Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.")
	private String password;

	@NotBlank(message = "닉네임은 필수 입력값입니다.")
	private String name;

	public User toEntity(String encodedPassword) {
		return User.builder()
			.name(name)
			.email(email)
			.password(encodedPassword)
			.role(UserRole.ROLE_USER)
			.build();
	}
}
