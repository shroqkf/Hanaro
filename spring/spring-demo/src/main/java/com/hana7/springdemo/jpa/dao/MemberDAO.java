package com.hana7.springdemo.jpa.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hana7.springdemo.jpa.dto.SearchCond;
import com.hana7.springdemo.jpa.entity.Member;

public interface MemberDAO {
	List<Member> findAll(SearchCond searchCond);

	List<Member> findAll(Pageable pager);

	Member findOne(long id);

	int remove(long id);
}
