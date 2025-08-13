package com.hana7.hanaro.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.item.entity.ItemImage;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {
}
