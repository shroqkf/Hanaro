package com.hana7.hanaro.domain.salesstats.dto;

import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class SalesStatsResponseDTO {
    private final String saledt;
    private final Long totalSalesAmount;
    private final Long totalOrderCount;

    public static SalesStatsResponseDTO fromEntity(SalesStats salesStats) {
        return SalesStatsResponseDTO.builder()
                .saledt(salesStats.getSaledt())
                .totalSalesAmount(salesStats.getTotalSalesAmount())
                .totalOrderCount(salesStats.getTotalOrderCount())
                .build();
    }
}