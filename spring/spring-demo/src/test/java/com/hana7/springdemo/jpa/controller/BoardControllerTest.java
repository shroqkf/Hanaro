package com.hana7.springdemo.jpa.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana7.springdemo.jpa.dto.BoardRequestDTO;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BoardControllerTest {
	private static final BoardRequestDTO dto = BoardRequestDTO.builder()
		.title("Title")
		.writer(1L)
		.content("Content")
		.build();
	private static final String titleToUpdate = "Title - up!!";

	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	private int workingId;

	@Test
	@Order(1)
	void listTest() throws Exception {
		int size = 3;
		mockMvc.perform(get("/boards")
				.param("page", "1")
				.param("countPerPage", String.valueOf(size))
			)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(size))
			.andDo(print());
	}

	@Test
	@Order(2)
	void createTest() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post("/boards")
				.contentType(MediaType.APPLICATION_JSON.toString())
				.content(objectMapper.writeValueAsString(dto))
			).andExpect(status().isOk())
			.andExpect(jsonPath("$.id").exists())
			.andDo(print())
			.andReturn();

		String resContentStr = mvcResult.getResponse().getContentAsString();
		JsonNode jsonNode = objectMapper.readTree(resContentStr);
		workingId = jsonNode.get("id").asInt();
	}

	@Test
	@Order(3)
	void changeTest() throws Exception {
		dto.setTitle(titleToUpdate);

		mockMvc.perform(patch("/boards/" + workingId)
				.contentType(MediaType.APPLICATION_JSON.toString())
				.content(objectMapper.writeValueAsString(dto))
			).andExpect(status().isOk())
			.andExpect(jsonPath("$.title").value(titleToUpdate))
			.andDo(print());
	}

	@Test
	@Order(4)
	void getTest() throws Exception {
		mockMvc.perform(get("/boards/" + workingId))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(workingId))
			// .andExpect(jsonPath("$.title").value(dto.getTitle()))
			.andExpect(jsonPath("$.title").value(titleToUpdate))
			.andDo(print());
	}

	@Test
	@Order(5)
	void removeTest() throws Exception {
		mockMvc.perform(delete("/boards/" + workingId))
			.andExpect(status().isOk())
			.andExpect(content().string(String.valueOf(workingId)))
			.andDo(print());
	}
}
