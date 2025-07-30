package com.hana7.springdemo.jpa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.springdemo.jpa.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	// Optional<Member> findById(Long id);
}
