package com.hana7.springdemo.jpa.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana7.springdemo.jpa.dto.BoardRequestDTO;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BoardControllerTest {
	static int boardId;
	private static BoardRequestDTO dto = BoardRequestDTO.builder()
		.title("Title")
		.writer(1L)
		.content("Content")
		.build();
	private static String newTitle = "New Title";

	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	@Test
	@Order(1)
	@DisplayName("게시글 목록 조회")
	void listTest() throws Exception {
		int size = 3;
		mockMvc.perform(get("/boards")
				.param("page", "1")
				.param("countPerPage", String.valueOf(size)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(size))
			.andDo(print());
	}

	@Test
	@Order(2)
	@DisplayName("게시글 생성")
	void createTest() throws Exception {

		String json = objectMapper.writeValueAsString(dto);

		mockMvc.perform(post("/boards")
				.contentType(MediaType.APPLICATION_JSON.toString())
				.content(json))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").exists())
			.andDo(print())
			.andReturn();

		String resContentStr = MvcResult.getResponse().getContentAsString();
		JsonMode jsonMode = objectMapper.readTree(resContentStr);
	}

	@Test
	@Order(3)
	@DisplayName("게시글 수정")
	void changeTest() throws Exception {
		dto.setTitle(newTitle);

		mockMvc.perform(patch("/boards/" + boardId)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(dto)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.title").value(newTitle))
			.andDo(print());
	}

	@Test
	@Order(4)
	@DisplayName("게시글 상세 조회")
	void getTest() throws Exception {
		mockMvc.perform(get("/boards/" + boardId))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(boardId))
			.andExpect(jsonPath("$.title").value(dto.getTitle()))
			.andDo(print());
	}

	@Test
	@Order(5)
	@DisplayName("게시글 삭제")
	void deleteTest() throws Exception {
		mockMvc.perform(delete("/boards/" + boardId))
			.andExpect(status().isOk())
			.andExpect(content().string(String.valueOf(boardId)))
			.andDo(print());
	}

	@Test
	@Order(6)
	@DisplayName("게시글 조회 실패")
	void notFoundTest() throws Exception {
		mockMvc.perform(get("/boards/9999"))
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.message").value("9999를 찾을 수 없습니다."))
			.andDo(print());
	}
}
