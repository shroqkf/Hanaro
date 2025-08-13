package com.hana7.hanaro.domain.cart.entity;

import com.hana7.hanaro.common.entity.BaseEntity;
import com.hana7.hanaro.domain.item.entity.Item;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Builder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"cart", "item"})
@Table(name = "cartItem")
public class CartItem extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "quantity", nullable=false)
	private Integer quantity;

	@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="cartId", foreignKey = @ForeignKey(name = "fk_CartItem_Cart"))
	private Cart cart;

	@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="productId", foreignKey = @ForeignKey(name = "fk_CartItem_Item"))
	private Item item;
}
