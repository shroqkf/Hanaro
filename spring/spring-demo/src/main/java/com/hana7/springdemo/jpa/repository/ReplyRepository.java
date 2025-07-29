package com.hana7.springdemo.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hana7.springdemo.jpa.entity.Board;
import com.hana7.springdemo.jpa.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {
	long countByBoard(Board board);

	List<Reply> findAllByBoard(Board board);

	@Query(value = "select * from Reply where board = :board order by rand() limit 1", nativeQuery = true)
	Optional<Reply> findRandomByBoard(@Param("board") int boardId);

	List<Reply> findByReply(String reply);

	Optional<Reply> findFirstByReply(String reply);
}
