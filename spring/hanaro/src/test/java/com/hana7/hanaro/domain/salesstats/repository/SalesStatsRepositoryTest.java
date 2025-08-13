package com.hana7.hanaro.domain.salesstats.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Commit;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.format.DateTimeFormatter;

class SalesStatsRepositoryTest extends RepositoryTest {

    @Autowired
    private SalesStatsRepository salesStatsRepository;

    @BeforeEach
    void setUp() {
        salesStatsRepository.deleteAll();
    }

    @Test
    @DisplayName("매출 통계 저장 및 ID로 조회 테스트")
    void saveAndFindByIdTest() {
        // given
        SalesStats stats = SalesStats.builder()
                .saledt(LocalDate.of(2025, 8, 12).format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .totalSalesAmount(100000L)
                .totalOrderCount(10L)
                .build();

        // when
        SalesStats savedStats = salesStatsRepository.save(stats);

        // then
        SalesStats foundStats = salesStatsRepository.findById(savedStats.getId()).orElseThrow();

        assertThat(foundStats.getId()).isEqualTo(savedStats.getId());
        assertThat(foundStats.getSaledt()).isEqualTo(LocalDate.of(2025, 8, 12).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        assertThat(foundStats.getTotalSalesAmount()).isEqualTo(100000L);
    }

    @Test
    @DisplayName("날짜 범위로 매출 통계 조회 테스트")
    void findBySaledtBetweenTest() {
        // given
        SalesStats stats1 = salesStatsRepository.save(SalesStats.builder()
                .saledt(LocalDate.of(2025, 8, 10).format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .totalSalesAmount(50000L)
                .totalOrderCount(5L)
                .build());

        SalesStats stats2 = salesStatsRepository.save(SalesStats.builder()
                .saledt(LocalDate.of(2025, 8, 11).format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .totalSalesAmount(120000L)
                .totalOrderCount(12L)
                .build());

        SalesStats stats3 = salesStatsRepository.save(SalesStats.builder()
                .saledt(LocalDate.of(2025, 8, 12).format(DateTimeFormatter.ofPattern("yyyyMMdd")))
                .totalSalesAmount(80000L)
                .totalOrderCount(8L)
                .build());

        // when
        String startDate = LocalDate.of(2025, 8, 11).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String endDate = LocalDate.of(2025, 8, 12).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        List<SalesStats> foundStatsList = salesStatsRepository.findBySaledtBetween(startDate, endDate);

        // then
        assertThat(foundStatsList).hasSize(2);
        assertThat(foundStatsList).extracting(SalesStats::getId).contains(stats2.getId(), stats3.getId());
        assertThat(foundStatsList).extracting(SalesStats::getId).doesNotContain(stats1.getId());
    }
}
