package com.hana7.hanaro.domain.salesstats.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AggregatedSalesStatsResponseDTO {
    private long totalSalesAmount;
    private long totalOrderCount;
}
