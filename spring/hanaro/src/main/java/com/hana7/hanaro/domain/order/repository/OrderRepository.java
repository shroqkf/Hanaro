package com.hana7.hanaro.domain.order.repository;

import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o "
        + "JOIN FETCH o.orderItems oi "
        + "JOIN FETCH oi.item WHERE o.status = :orderState AND o.createdAt "
        + "BETWEEN :startDateTime AND :endDateTime")
    List<Order> findByStatusAndCreatedAtBetween(OrderState orderState, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<Order> findByUser(User user);

    @Query("SELECT FUNCTION('DATE_FORMAT', o.createdAt, '%Y%m%d'), COUNT(o.id), SUM(oi.price * oi.quantity) " +
           "FROM Order o JOIN o.orderItems oi " +
           "WHERE FUNCTION('DATE_FORMAT', o.createdAt, '%Y%m%d') = :saledt")
    Object[] getTodayStat(@Param("saledt") String saledt);

    @Query("SELECT oi FROM OrderItem oi JOIN oi.order o " +
           "WHERE FUNCTION('DATE_FORMAT', o.createdAt, '%Y%m%d') = :saledt")
    List<com.hana7.hanaro.domain.order.entity.OrderItem> getTodayItemStat(@Param("saledt") String saledt);
}