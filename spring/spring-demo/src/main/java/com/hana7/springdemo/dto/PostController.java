package com.hana7.springdemo.dto;

import java.time.LocalDateTime;
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

import com.hana7.springdemo.service.PostService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/posts")
@Log4j2
public class PostController {
	private final PostService service;
	public PostController(PostService service){
		this.service=service;
	}

	@PostMapping("")
	public Post registry(@RequestBody @Validated Post post) {
		log.debug("post={}", post);

		if (post.getCreatedAt() == null) {
			post.setCreatedAt(LocalDateTime.now());
		}

		service.savePost(post);
		return post;
	}

	@GetMapping("")
	public List<Post> findAll() {
		return service.getPosts();
	}

	@GetMapping("/{id}")
	public Post findPost(@PathVariable("id") Integer id) {
		log.info("GET={}", id);
		return service.getPost(id);
	}

	@PatchMapping("/{id}")
	public Post updatePost(@PathVariable("id") Integer id, @RequestBody @Validated Post post) {
		post.setId(id);
		service.savePost(post);
		return post;
	}

	@DeleteMapping("/{id}")
	public int deletePost(@PathVariable("id") Integer id) {
		service.removePost(id);
		return id;
	}
}
