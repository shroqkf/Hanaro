package com.hana7.springdemo.jpa.service;

import java.util.List;

import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.SearchCond;

public interface MemberService {
	List<MemberDTO> findAll(SearchCond searchCond);

	MemberDTO findOne(long id);

	int remove(long id);
}
