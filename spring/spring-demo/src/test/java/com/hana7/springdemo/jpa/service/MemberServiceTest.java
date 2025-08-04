package com.hana7.springdemo.jpa.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.hana7.springdemo.jpa.dao.MemberDAO;
import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.entity.BloodType;
import com.hana7.springdemo.jpa.entity.Member;

@SpringBootTest
class MemberServiceTest {
	private static final Long memberId = 1L;
	private static final Member member = Member.builder()
		.id(1L)
		.nickname("Hong")
		.email("hong@gmail.com")
		.bloodType(BloodType.B)
		.build();

	@MockitoBean
	MemberDAO dao;

	@Autowired
	MemberService service;

	@BeforeEach
	void setup() {
		given(dao.findOne(memberId)).willReturn(member);
	}

	@Test
	@DisplayName("MemberDAO Test")
	void findOne() {
		Member foundMember = dao.findOne(memberId);
		assertEquals(member.getId(), foundMember.getId());
		assertEquals(member.getNickname(), foundMember.getNickname());
	}

	@Test
	@DisplayName("MemberService Test")
	void selectOne() {
		// when
		MemberDTO memberDTO = service.findOne(memberId);

		// then
		assertEquals(memberDTO.getId(), member.getId());
		assertEquals(memberDTO.getNickname(), member.getNickname());

		assertEquals(memberDTO, MemberDTO.builder().id(member.getId())
			.nickname(member.getNickname())
			.email(member.getEmail())
			.bloodType(member.getBloodType()).build());

		assertEquals(memberDTO, MemberServiceImpl.toDetailDTO(member));
	}
}
