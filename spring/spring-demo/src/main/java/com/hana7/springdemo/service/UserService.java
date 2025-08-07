package com.hana7.springdemo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hana7.springdemo.dao.UserDAO;
import com.hana7.springdemo.dto.User;

@Service
public class UserService {
	private final UserDAO repository;

	public UserService(UserDAO repository) {
		this.repository = repository;
	}

	public List<User> getUsers() {
		return repository.getUsers();
	}

	public User getUser(int id) {
		return repository.getUser(id);
	}

	public void save(User user) {
		if (user.getId() > 0)
			repository.update(user);
		else
			repository.insert(user);
	}

	public void remove(int id) {
		repository.delete(id);
	}
}
