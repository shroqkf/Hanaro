package com.hana7.hanaro.domain.user.repository;

import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.hana7.hanaro.domain.user.entity.User;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);

	Optional<User> findByEmailAndDeletedAtIsNull(String email);
	Optional<User> findByIdAndDeletedAtIsNull(Long id);
	List<User> findAllByDeletedAtIsNull();

	@Modifying
	@Query("UPDATE User u SET u.deletedAt = :deletedAt WHERE u.id = :id")
	void softDeleteById(@Param("id") Long id, @Param("deletedAt") LocalDateTime deletedAt);
}
