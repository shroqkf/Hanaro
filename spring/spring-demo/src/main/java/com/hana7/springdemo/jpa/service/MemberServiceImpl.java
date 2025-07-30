package com.hana7.springdemo.jpa.service;

import java.util.List;

import com.hana7.springdemo.jpa.dao.MemberDAO;
import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.MemberRequestDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberDAO dao;

	@Override
	public List<MemberDTO> findAll() {
		return List.of();
	}

	@Override
	public MemberDTO findOne() {
		return null;
	}

	@Override
	public MemberDTO save(MemberRequestDTO dto) {
		return null;
	}

	@Override
	public void remove() {

	}
}
