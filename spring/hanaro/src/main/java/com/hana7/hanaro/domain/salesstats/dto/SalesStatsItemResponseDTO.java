package com.hana7.hanaro.domain.salesstats.dto;

import com.hana7.hanaro.domain.salesstats.entity.SalesStatsItem;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SalesStatsItemResponseDTO {
    private String saledt;
    private Long itemId;
    private String itemName;
    private int soldQuantity;
    private long itemSalesAmount;

    public static SalesStatsItemResponseDTO fromEntity(SalesStatsItem entity) {
        return SalesStatsItemResponseDTO.builder()
                .saledt(entity.getStatsDate().toString()) // Assuming statsDate is LocalDate
                .itemId(entity.getItem().getId())
                .itemName(entity.getItem().getName())
                .soldQuantity(entity.getSoldQuantity())
                .itemSalesAmount(entity.getItemSalesAmount())
                .build();
    }
}
