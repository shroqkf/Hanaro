package com.hana7.hanaro.domain.salesstats.entity;

import com.hana7.hanaro.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "salesStat")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SalesStats extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 통계 날짜
    @Column(nullable = false, unique = true)
    private String saledt;

    // 총 매출액
    @Column(nullable = false)
    private Long totalSalesAmount;

    // 총 주문 수
    @Column(nullable = false)
    private Long totalOrderCount;
}
