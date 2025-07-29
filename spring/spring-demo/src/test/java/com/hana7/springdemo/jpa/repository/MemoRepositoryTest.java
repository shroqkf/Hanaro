package com.hana7.springdemo.jpa.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import com.hana7.springdemo.jpa.entity.Memo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemoRepositoryTest {

	@Autowired
	MemoRepository repository;

	@Test
	void Test() {
		Memo memo = Memo.builder().memoText("Test Memo").build();
		Memo savedMemo = repository.save(memo);
		Memo foundMemo = repository.findById(savedMemo.getMno()).orElseThrow();

		assertEquals(savedMemo, foundMemo);

		System.out.println("foundMemo = " + foundMemo);
		System.out.println("savedMemo = " + savedMemo);

		foundMemo.setMemoText("New MemoText!!");
		repository.save(foundMemo);
		System.out.println("foundMemo = " + foundMemo);

		repository.deleteById(savedMemo.getMno());
		Optional<Memo> byId = repository.findById(savedMemo.getMno());
		byId.ifPresent(m-> System.out.println("memo = " + m));
	}
}
