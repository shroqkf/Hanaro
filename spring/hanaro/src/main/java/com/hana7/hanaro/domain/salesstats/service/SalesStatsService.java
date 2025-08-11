package com.hana7.hanaro.domain.salesstats.service;

import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import com.hana7.hanaro.domain.salesstats.repository.SalesStatsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class SalesStatsService {

    private final OrderRepository orderRepository;
    private final SalesStatsRepository salesStatsRepository;

    /**
     * 매일 새벽 1시에 전날의 매출 통계를 계산하여 저장합니다.
     */
    @Scheduled(cron = "0 0 1 * * ?") // 매일 새벽 1시에 실행
    @Transactional
    public void scheduledDailyStats() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        log.info("Scheduling daily stats calculation for: {}", yesterday);
        calculateAndSaveDailyStats(yesterday);
    }

    /**
     * 특정 날짜의 매출 통계를 계산하고 DB에 저장합니다.
     * @param date 통계를 계산할 날짜
     */
    @Transactional
    public void calculateAndSaveDailyStats(LocalDate date) {
        LocalDateTime startDateTime = date.atStartOfDay(); // ex: 2025-08-10 00:00:00
        LocalDateTime endDateTime = date.atTime(LocalTime.MAX);   // ex: 2025-08-10 23:59:59.999...

        // 해당 날짜의 "COMPLETED" 상태인 주문 목록을 가져옵니다.
        List<Order> completedOrders = orderRepository.findByStatusAndCreatedAtBetween(
                OrderState.COMPLETED, startDateTime, endDateTime);

        // 총 매출액 계산
        long totalSalesAmount = completedOrders.stream()
                .mapToLong(Order::getTotalPrice)
                .sum();

        // 총 주문 수
        long totalOrderCount = completedOrders.size();

        // 통계 엔티티 생성 및 저장
        SalesStats dailyStats = SalesStats.builder()
                .statsDate(date)
                .totalSalesAmount(totalSalesAmount)
                .totalOrderCount(totalOrderCount)
                .build();

        salesStatsRepository.save(dailyStats);
        log.info("Successfully saved daily stats for {}: Amount={}, Count={}", date, totalSalesAmount, totalOrderCount);
    }

    /**
     * 특정 기간 동안의 매출 통계를 조회합니다.
     * @param startDate 시작일
     * @param endDate 종료일
     * @return 통계 데이터 리스트
     */
    public List<SalesStats> getStatsByDateRange(LocalDate startDate, LocalDate endDate) {
        return salesStatsRepository.findByStatsDateBetween(startDate, endDate);
    }
}
