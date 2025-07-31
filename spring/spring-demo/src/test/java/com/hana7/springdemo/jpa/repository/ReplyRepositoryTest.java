package com.hana7.springdemo.jpa.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Commit;

import com.hana7.springdemo.jpa.entity.Board;
import com.hana7.springdemo.jpa.entity.Reply;

// @Rollback(false)
class ReplyRepositoryTest extends RepositoryTest {
	@Autowired
	ReplyRepository repository;

	@Autowired
	BoardRepository boardRepository;

	@Test
	@Order(1)
	void addTest() {
		Board board = getBoard();
		long preCount = repository.countByBoard(board);
		repository.saveAll(
			Stream.iterate(1, n -> n + 1).limit(10)
				.map(n -> Reply.builder()
					.reply("Reply" + n)
					.replyer(board.getWriter())
					.board(board)
					.build()).toList()
		);
		assertEquals(preCount + 10, repository.countByBoard(board));
	}

	@Test
	@Order(3)
	void listTest() {
		Board board = getBoard();
		repository.findAllByBoard(board).forEach(this::print);
	}

	@Test
	@Order(2)
	@Commit
	void updateTest() {
		Board board = getBoard();
		Reply reply = repository.findRandomByBoard(board.getId()).orElseThrow();
		reply.setReply("RRRRR");
	}

	@Test
	@Order(4)
	void deleteTest() {
		// List<Reply> rrr = repository.findByReply("RRRRR");
		Reply reply = repository.findFirstByReply("RRRRR").orElseThrow();
		System.out.println("reply = " + reply);
		repository.delete(reply);
	}

	private Board getBoard() {
		Optional<Board> optionalBoard = boardRepository.findById(1);

		return optionalBoard.orElseGet(() -> boardRepository.save(Board.builder()
			.title("Title01")
			.writer(null)
			.build()));

	}
}
