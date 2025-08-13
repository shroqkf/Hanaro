package com.hana7.hanaro.domain.order.dto;

import com.hana7.hanaro.domain.order.entity.OrderState;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderResponseDTO {

    private Long orderId;
    private Long userId;
    private String userEmail;
    private String userName;
    private int totalPrice;
    private OrderState status;
    private List<OrderItemResponseDTO> orderItems;

}
