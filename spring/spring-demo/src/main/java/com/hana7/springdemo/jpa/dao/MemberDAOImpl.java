package com.hana7.springdemo.jpa.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.hana7.springdemo.jpa.dto.SearchCond;
import com.hana7.springdemo.jpa.entity.Member;
import com.hana7.springdemo.jpa.entity.MemberImage;
import com.hana7.springdemo.jpa.entity.QMember;
import com.hana7.springdemo.jpa.repository.MemberImageRepository;
import com.hana7.springdemo.jpa.repository.MemberRepository;
import com.querydsl.core.BooleanBuilder;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MemberDAOImpl implements MemberDAO {
	private final MemberRepository repository;
	private final MemberImageRepository imageRepository;

	@Override
	public List<Member> findAll(SearchCond searchCond) {
		QMember qm = QMember.member;
		BooleanBuilder bb = new BooleanBuilder();
		if (StringUtils.hasText(searchCond.getSearchNickname())) {
			bb.and(qm.nickname.contains(searchCond.getSearchNickname()));
		}

		if (StringUtils.hasText(searchCond.getSearchEmail())) {
			bb.and(qm.email.contains(searchCond.getSearchEmail()));
		}

		return repository.findAll(bb, searchCond.getPager()).stream().toList();
	}

	@Override
	public List<Member> findAll(Pageable pager) {
		return repository.findAll(pager).stream().toList();
	}

	@Override
	public Member findOne(long id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public int remove(long id) {
		// if (repository.findById(id).isPresent()) {
		// 	repository.deleteById(id);
		// 	return 1;
		// }
		return repository.removeById(id);
	}

	@Override
	public List<MemberImage> uploadImages(Long memberId, List<MemberImage> memberImages) {
		Optional<Member> memberOptional = repository.findById(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			memberImages.forEach(mi -> mi.setMember(member));
			member.setImages(memberImages);
			imageRepository.saveAll(memberImages);
		}

		return memberImages;
	}

}
