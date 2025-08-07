package com.hana7.springdemo.jpa.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.hana7.springdemo.jpa.dao.MemberDAO;
import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.SearchCond;
import com.hana7.springdemo.jpa.entity.BloodType;
import com.hana7.springdemo.jpa.entity.Member;

public class MemberServiceRemoveTest {
	private final MemberDAO dao = Mockito.mock(MemberDAO.class);
	private final MemberService service = new MemberServiceImpl(dao);

	public static Member getMemberEntity() {
		return Member.builder()
			.id(1L)
			.nickname("Hong")
			.email("hong@gmail.com")
			.bloodType(BloodType.B)
			.build();
	}

	@Test
	void listTest() {
		Member member = getMemberEntity();
		SearchCond searchCond = SearchCond.builder()
			.page(1).size(2)
			.build();
		Mockito.when(dao.findAll(searchCond.getPager()))
			.thenReturn(List.of(member, member));
		
		List<MemberDTO> list = service.findAll(searchCond);
		System.out.println("list = " + list);
		Assertions.assertEquals(2, list.size());
	}

	@Test
	void removeTest() {
		Mockito.when(service.remove(getMemberEntity().getId())).thenReturn(1);
		// .thenReturn(member.getId().intValue());

		int affectedRowCount = service.remove(1L);
		assertEquals(1, affectedRowCount);
	}
}
