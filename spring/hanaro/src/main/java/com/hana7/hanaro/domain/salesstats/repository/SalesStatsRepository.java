package com.hana7.hanaro.domain.salesstats.repository;

import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalesStatsRepository extends JpaRepository<SalesStats, Long> {
    List<SalesStats> findBySaledtBetween(String startDate, String endDate);
}
