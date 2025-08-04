package com.hana7.springdemo.jpa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hana7.springdemo.jpa.dao.MemberDAO;
import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.MemberDetailResponseDTO;
import com.hana7.springdemo.jpa.dto.MemberResponseDTO;
import com.hana7.springdemo.jpa.dto.SearchCond;
import com.hana7.springdemo.jpa.entity.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {
	private final MemberDAO dao;

	@Override
	public List<MemberDTO> findAll(SearchCond searchCond) {
		List<Member> members;
		if (searchCond.needSearch()) {
			members = dao.findAll(searchCond);
		} else {
			members = dao.findAll(searchCond.getPager());
		}

		return members.stream()
			.map(MemberServiceImpl::toDTO).toList();
	}

	@Override
	public MemberDTO findOne(long id) {
		return toDetailDTO(dao.findOne(id));
	}

	@Override
	public int remove(long id) {
		log.debug("id={}", id);
		return dao.remove(id);
	}

	public static MemberDTO toDTO(Member member) {
		return MemberResponseDTO.builder()
			.id(member.getId())
			.nickname(member.getNickname())
			.email(member.getEmail())
			.bloodType(member.getBloodType())
			.build();
	}

	static MemberDTO toDetailDTO(Member member) {
		return MemberDetailResponseDTO.builder()
			.id(member.getId())
			.nickname(member.getNickname())
			.email(member.getEmail())
			.bloodType(member.getBloodType())
			.auth(member.getAuth())
			.boards(member.getBoards().stream().map(BoardServiceImpl::toDetailDTO).toList())
			.build();
	}
}
