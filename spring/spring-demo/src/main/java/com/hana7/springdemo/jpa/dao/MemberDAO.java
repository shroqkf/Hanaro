package com.hana7.springdemo.jpa.dao;

import java.util.List;

import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.MemberRequestDTO;

public interface MemberDAO {
	List<MemberDTO> findAll();
	MemberDTO findOne();
	MemberDTO save(MemberRequestDTO dto);
	void delete();
}
