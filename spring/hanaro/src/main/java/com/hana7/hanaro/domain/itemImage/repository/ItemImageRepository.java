package com.hana7.hanaro.domain.itemImage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.itemImage.entity.ItemImage;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {
}
