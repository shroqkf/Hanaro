package com.hana7.hanaro.domain.salesstats.service;

import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import com.hana7.hanaro.domain.salesstats.repository.SalesStatsRepository;
import com.hana7.hanaro.domain.salesstats.repository.SalesStatsItemRepository;
import com.hana7.hanaro.domain.salesstats.dto.AggregatedSalesStatsResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class SalesStatsService {

    private final OrderRepository orderRepository;
    private final SalesStatsRepository salesStatsRepository;
    private final SalesStatsItemRepository salesStatsItemRepository;

    // 매일 새벽 1시에 전날의 매출 통계를 계산하여 저장
    @Scheduled(cron = "*/10 * * * * *")
    @Transactional
    public void scheduledDailyStats() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        calculateAndSaveDailyStats(yesterday);
		LocalDateTime today= LocalDateTime.now();
		calculateAndSaveDailyStats(LocalDate.from(today));

	}

    // 특정 날짜(date)의 매출 통계를 계산하고 DB에 저장
	@Transactional
	public void calculateAndSaveDailyStats(LocalDate date) {
		LocalDateTime startDateTime = date.atStartOfDay();
		LocalDateTime endDateTime = date.atTime(LocalTime.MAX);

		// 해당 날짜의 "COMPLETED" 상태인 주문 목록 조회
		List<Order> completedOrders = orderRepository.findByStatusAndCreatedAtBetween(
			OrderState.COMPLETED, startDateTime, endDateTime);

		// 총 매출액 계산
		long totalSalesAmount = completedOrders.stream()
			.mapToLong(Order::getTotalPrice)
			.sum();

		// 총 주문 수
		long totalOrderCount = completedOrders.size();

		String formattedDate = date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

		// 통계 엔티티 생성 또는 업데이트
		SalesStats dailyStats = salesStatsRepository.findBySaledt(formattedDate)
			.orElseGet(() -> SalesStats.builder().saledt(formattedDate).build());

		dailyStats.setTotalSalesAmount(totalSalesAmount);
		dailyStats.setTotalOrderCount(totalOrderCount);

		salesStatsRepository.save(dailyStats);
		log.info("일별 통계 {}: 매출={}, 주문건수={}", date, totalSalesAmount, totalOrderCount);
	}

     // 특정 기간 동안의 매출 통계 조회
    public AggregatedSalesStatsResponseDTO getStatsByDateRange(LocalDate startDate, LocalDate endDate) {
        List<SalesStats> salesStatsList = salesStatsRepository.findBySaledtBetween(
                startDate.format(DateTimeFormatter.ofPattern("yyyyMMdd")),
                endDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"))
        );

        long totalSalesAmount = salesStatsList.stream()
                .mapToLong(SalesStats::getTotalSalesAmount)
                .sum();

        long totalOrderCount = salesStatsList.stream()
                .mapToLong(SalesStats::getTotalOrderCount)
                .sum();

        return AggregatedSalesStatsResponseDTO.builder()
                .totalSalesAmount(totalSalesAmount)
                .totalOrderCount(totalOrderCount)
                .build();
    }
}
