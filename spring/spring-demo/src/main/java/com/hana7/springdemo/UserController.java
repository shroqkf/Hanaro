package com.hana7.springdemo;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana7.springdemo.dto.User;
import com.hana7.springdemo.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/users")
@Log4j2
@Tag(name = "사용자 APIs", description = "사용자 목록/등록/수정/삭제")
public class UserController {
	private final UserService service;

	public UserController(UserService service) {
		this.service = service;
	}

	@PostMapping("")
	@Tag(name = "사용자 가입")
	public User registry(@RequestBody @Validated User user) {
		log.debug("user={}", user);
		service.save(user);
		return user;
	}

	@GetMapping("")
	public List<User> findAll() {
		return service.getUsers();
	}

	@GetMapping("/{id}")
	public User findUser(@PathVariable("id") Integer id) {
		log.info("GET={}", id);

		return service.getUser(id);
	}

	@PatchMapping("/{id}")
	public User updateUser(@PathVariable("id") Integer id, @RequestBody @Validated User user) {
		user.setId(id);
		service.save(user);
		return user;
	}

	@DeleteMapping("/{id}")
	public int deleteUser(@PathVariable("id") Integer id) {
		service.remove(id);
		return id;
	}
}
