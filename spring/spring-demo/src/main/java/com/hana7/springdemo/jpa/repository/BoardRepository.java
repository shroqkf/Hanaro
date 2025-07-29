package com.hana7.springdemo.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.springdemo.jpa.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {
}
