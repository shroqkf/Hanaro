package com.hana7.hanaro.domain.order.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemResponseDTO {

    private Long itemId;
    private String itemName;
    private long price;
    private int quantity;

}
