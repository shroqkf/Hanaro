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

class SalesStatsRepositoryTest extends RepositoryTest {

    @Autowired
    private SalesStatsRepository salesStatsRepository;

    @BeforeEach
    void setUp() {
        salesStatsRepository.deleteAll();
    }

    @Test
    @DisplayName("매출 통계 저장 및 ID로 조회 테스트")
    @Commit
    void saveAndFindByIdTest() {
        // given
        SalesStats stats = SalesStats.builder()
                .statsDate(LocalDate.now())
                .totalSalesAmount(100000L)
                .totalOrderCount(10L)
                .build();

        // when
        SalesStats savedStats = salesStatsRepository.save(stats);

        // then
        SalesStats foundStats = salesStatsRepository.findById(savedStats.getId()).orElseThrow();

        assertThat(foundStats.getId()).isEqualTo(savedStats.getId());
        assertThat(foundStats.getStatsDate()).isEqualTo(LocalDate.now());
        assertThat(foundStats.getTotalSalesAmount()).isEqualTo(100000L);
        print(foundStats);
    }

    @Test
    @DisplayName("날짜 범위로 매출 통계 조회 테스트")
    void findByStatsDateBetweenTest() {
        // given
        SalesStats stats1 = salesStatsRepository.save(SalesStats.builder()
                .statsDate(LocalDate.of(2025, 8, 10))
                .totalSalesAmount(50000L)
                .totalOrderCount(5L)
                .build());

        SalesStats stats2 = salesStatsRepository.save(SalesStats.builder()
                .statsDate(LocalDate.of(2025, 8, 11))
                .totalSalesAmount(120000L)
                .totalOrderCount(12L)
                .build());

        SalesStats stats3 = salesStatsRepository.save(SalesStats.builder()
                .statsDate(LocalDate.of(2025, 8, 12))
                .totalSalesAmount(80000L)
                .totalOrderCount(8L)
                .build());

        // when
        LocalDate startDate = LocalDate.of(2025, 8, 11);
        LocalDate endDate = LocalDate.of(2025, 8, 12);
        List<SalesStats> foundStatsList = salesStatsRepository.findByStatsDateBetween(startDate, endDate);

        // then
        assertThat(foundStatsList).hasSize(2);
        assertThat(foundStatsList).extracting(SalesStats::getId).contains(stats2.getId(), stats3.getId());
        assertThat(foundStatsList).extracting(SalesStats::getId).doesNotContain(stats1.getId());
        print(foundStatsList);
    }
}
