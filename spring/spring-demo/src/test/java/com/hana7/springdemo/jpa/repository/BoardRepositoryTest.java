package com.hana7.springdemo.jpa.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Rollback;

import com.hana7.springdemo.jpa.entity.Board;
import com.hana7.springdemo.jpa.entity.BoardContent;

@Rollback(false)
class BoardRepositoryTest extends RepositoryTest {
	@Autowired
	BoardRepository repository;

	@Autowired
	BoardContentRepository contentRepository;

	private static final int LIMIT = 10;

	@Test
	@Order(1)
	void addTest() {
		long preCount = repository.count();

		List<Board> list = Stream.iterate(1, n -> n + 1)
			.limit(LIMIT)
			.map(n -> Board.builder()
				.title("Title" + n)
				.writer("Writer" + n)
				// .content(new BoardContent("Content" + n))
				.build())
			.toList();

		list.forEach(b -> b.setContent(new BoardContent("xxx", b)));

		repository.saveAll(list);

		// List<BoardContent> contents = list.stream()
		// 	.map(b -> new BoardContent("Content", b)).toList();
		// contentRepository.saveAll(contents);

		assertEquals(preCount + LIMIT, repository.count());
	}

	@Test
	@Order(2)
	void pageListTest() {
		repository.findAll(
			PageRequest.of(0, 10, Sort.by(Sort.Order.desc("id")))).forEach(this::print);
	}

}
