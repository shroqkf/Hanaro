package com.hana7.hanaro.domain.item.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
	Page<Item> findByNameContainsIgnoreCase(String keyword, Pageable pageable);
}
