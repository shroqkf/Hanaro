package com.hana7.springdemo.dto;

import java.util.ArrayList;
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

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/users")
@Log4j2
public class UserController {
	@PostMapping("")
	public User registry(@RequestBody @Validated User user) {
		log.debug("user={}", user);
		user.setId(100);
		return user;
	}

	@GetMapping("")
	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			list.add(User.builder()
				.id(i + 1)
				.name("Guest")
				.email("abc" + i + "@gmail.com")
				.mobile("010-2222-3333" + i)
				.build());
		}
		return list;
	}

	@GetMapping("/{id}")
	public User findUser(@PathVariable("id") Integer id) {
		log.info("GET={}", id);
		return User.builder()
			.id(id)
			.name("Guest")
			.email("abc@gmail.com")
			.mobile("010-2222-3333")
			.build();
	}

	@PatchMapping("/{id}")
	public User updateUser(@PathVariable("id") Integer id, @RequestBody @Validated User user) {
		user.setId(id);
		return user;
	}

	@DeleteMapping("/{id}")
	public int deleteUser(@PathVariable("id") Integer id) {
		return id % 2;
	}
}
