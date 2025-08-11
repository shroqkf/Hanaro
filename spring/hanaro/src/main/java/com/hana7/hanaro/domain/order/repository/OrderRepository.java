package com.hana7.hanaro.domain.order.repository;

import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatusAndCreatedAtBetween(OrderState orderState, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<Order> findByUser(User user);
}
