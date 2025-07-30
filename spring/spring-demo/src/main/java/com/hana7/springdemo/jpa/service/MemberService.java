package com.hana7.springdemo.jpa.service;

import java.util.List;

import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.MemberRequestDTO;

public interface MemberService {
	List<MemberDTO> findAll();

	MemberDTO findOne();

	MemberDTO save(MemberRequestDTO dto);

	void remove();
}
