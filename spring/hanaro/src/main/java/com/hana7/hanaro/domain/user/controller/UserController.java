package com.hana7.hanaro.domain.user.controller;

import com.hana7.hanaro.common.security.JwtUtil;
import com.hana7.hanaro.domain.user.dto.UserLoginRequestDTO;
import com.hana7.hanaro.domain.user.dto.UserResponseDTO;
import com.hana7.hanaro.domain.user.dto.UserRequestDTO;
import com.hana7.hanaro.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@Tag(name = "회원")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;

	@Operation(summary = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<Void> signUp(@RequestBody @Valid UserRequestDTO request) {
		Long userId = userService.signUp(request);
		return ResponseEntity.created(URI.create("/users/" + userId)).build();
	}

	@Operation(summary = "로그인")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid UserLoginRequestDTO request) {
		try {
			Authentication authenticate = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
					request.getName(), request.getPassword()
				)
			);
			System.out.println("authenticate = " + authenticate);
			return ResponseEntity.ok(JwtUtil.getClaims(authenticate));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid!");
		}
	}

	@Operation(summary = "회원 목록 조회 (관리자용)")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/list")
	public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}

	@Operation(summary = "회원 상세 조회 (관리자용)")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/{id}")
	public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
		return ResponseEntity.ok(userService.getUserById(id));
	}

	@Operation(summary = "회원 삭제 (관리자용)")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}
