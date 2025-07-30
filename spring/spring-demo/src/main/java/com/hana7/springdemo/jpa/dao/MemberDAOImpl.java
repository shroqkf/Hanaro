package com.hana7.springdemo.jpa.dao;

import java.util.List;

import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.MemberRequestDTO;
import com.hana7.springdemo.jpa.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberDAOImpl implements MemberDAO {
	private final MemberRepository respository;

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
	public void delete() {

	}
}
