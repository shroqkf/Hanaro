package com.hana7.hanaro.domain.salesstats.entity;

import com.hana7.hanaro.common.entity.BaseEntity;
import com.hana7.hanaro.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "salesStatItem")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class SalesStatsItem extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// 통계 날짜
	@Column(nullable = false)
	private LocalDate statsDate;

	// 판매된 상품
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "itemId", nullable = false)
	private Item item;

	// 판매된 수량
	@Column(nullable = false)
	private Integer soldQuantity;

	// 해당 상품의 총 매출액
	@Column(nullable = false)
	private Long itemSalesAmount;
}
