package com.hana7.hanaro.domain.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginRequestDTO {
	@NotBlank(message = "사용자명은 필수입니다.")
	@Size(min = 1, max=20, message = "..")
	@Schema(name = "name", example = "test@example.com")
	String name;

	@NotBlank(message = "비밀번호는 필수입니다.")
	@Schema(name = "password",example = "password")
	String password;
}
