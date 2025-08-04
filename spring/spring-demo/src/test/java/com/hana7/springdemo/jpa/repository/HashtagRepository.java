package com.hana7.springdemo.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hana7.springdemo.jpa.entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
	@Query("select h from Hashtag h join h.boards b where b.id = :boardId")
	List<Hashtag> findAllByBoardId(@Param("boardId") int boardId);
}
