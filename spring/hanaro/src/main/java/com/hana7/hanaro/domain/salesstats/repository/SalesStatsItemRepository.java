package com.hana7.hanaro.domain.salesstats.repository;

import com.hana7.hanaro.domain.salesstats.entity.SalesStatsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesStatsItemRepository extends JpaRepository<SalesStatsItem, Long> {
}
