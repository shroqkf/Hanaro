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
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MemberControllerTest {
	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	@Test
	@Order(2)
	void deleteTest() throws Exception {
		mockMvc.perform(delete("/members/2"))
			.andExpect(status().isOk())
			.andExpect(content().string("1"))
			.andDo(print());
	}

	@Test
	@Order(3)
	void deleteNotFoundTest() throws Exception {
		mockMvc.perform(delete("/members/99999"))
			.andExpect(status().isNotFound())
			.andDo(print());
	}

	@Test
	@DisplayName("Member list test")
	@Order(1)
	void listTest() throws Exception {
		int size = 2;
		mockMvc.perform(get("/members")
				.param("page", "1")
				.param("size", String.valueOf(size))
			).andExpect(status().isOk())
			.andExpect(jsonPath("$.length()").value(size))
			.andExpect(jsonPath("$[0].id").value(2))
			.andExpect(jsonPath("$[1].id").value(1))
			.andExpect(jsonPath("$[1].nickname").value("hongx"))
			.andDo(print());
	}
}
