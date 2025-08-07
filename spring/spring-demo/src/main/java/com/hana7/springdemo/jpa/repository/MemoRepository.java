package com.hana7.springdemo.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import com.hana7.springdemo.jpa.entity.Memo;

public interface MemoRepository extends JpaRepository<Memo, Integer>, QuerydslPredicateExecutor<Memo> {
	List<Memo> findByMnoBetweenOrderByMnoDesc(int start, int end);

	List<Memo> findByMnoBetween(int start, int end, Sort sorting);

	void deleteByMnoBetween(int start, int end);

	long removeByMnoBetween(int start, int end);

	@Query("select m from Memo m where m.mno > :boundary order by m.mno desc")
	List<Memo> getListOverDesc(@Param("boundary") int boundary);

	@Query("select m.mno, m.memoText from Memo m order by m.mno desc")
	List<Object[]> getListSomeDesc();
}
