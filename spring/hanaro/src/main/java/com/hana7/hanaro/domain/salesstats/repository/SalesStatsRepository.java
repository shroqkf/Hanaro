package com.hana7.hanaro.domain.salesstats.repository;

import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SalesStatsRepository extends JpaRepository<SalesStats, Long> {
    List<SalesStats> findByStatsDateBetween(LocalDate startDate, LocalDate endDate);
}
