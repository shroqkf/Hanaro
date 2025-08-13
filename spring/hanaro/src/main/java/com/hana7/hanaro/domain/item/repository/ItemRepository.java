package com.hana7.hanaro.domain.item.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Added import

import com.hana7.hanaro.domain.item.entity.Item;
import java.util.Optional; // Added import

public interface ItemRepository extends JpaRepository<Item, Long> {
	Page<Item> findByNameContainsIgnoreCase(String keyword, Pageable pageable);

	@Query("SELECT i FROM Item i LEFT JOIN FETCH i.images WHERE i.id = :itemId")
	Optional<Item> findByIdWithImages(Long itemId);
}
