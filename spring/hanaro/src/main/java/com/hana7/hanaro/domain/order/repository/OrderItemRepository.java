package com.hana7.hanaro.domain.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.order.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

	List<OrderItem> findByItem(Item itemToDelete);
}
