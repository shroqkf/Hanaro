package com.hana7.springdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.hana7.springdemo.dto.User;

@Repository
@Mapper
public interface UserDAO {
	public User getUser(int id);
	public void insert(User user);
	public void update(User user);
	public void delete(int id);
	List<User> getUsers();
}
