package com.hana7.springdemo.service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hana7.springdemo.dao.PostRepository;
import com.hana7.springdemo.dto.Post;
import com.hana7.springdemo.dto.User;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class PostService {
	private final PostRepository repository;

	public PostService(PostRepository repository) {
		this.repository = repository;
	}

	public List<Post> getPosts() {
		List<Post> posts = repository.getPosts();
		Map<Integer, User> users = repository.getUsers().stream().collect(Collectors.toMap(User::getId, user -> user,
			(exists, replacer) -> exists));
		// Function.identity()
		log.debug("users={}", users);

		for (Post post : posts) {
			post.setUser(users.get(post.getWriter()));
		}
		return posts;
	}

	public Post getPost(int id) {
		return repository.getPost(id);
	}
	public Post getPostx(int id) {
		Post post = repository.getPost(id);
		post.setUser(repository.getUser(post));
		return post;
	}

	public void save(Post user) {
		if (user.getId() > 0)
			repository.update(user);
		else
			repository.insert(user);
	}

	public void remove(int id) {
		repository.delete(id);
	}
}
