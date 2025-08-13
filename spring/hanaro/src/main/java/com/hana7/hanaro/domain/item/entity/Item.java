package com.hana7.hanaro.domain.item.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.hana7.hanaro.common.entity.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "item", indexes = @jakarta.persistence.Index(name = "idx_item_name", columnList = "name"))
public class Item extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "bigint unsigned", unique = true)
	private Long id;

	@NotBlank
	@Column(length = 30, nullable = false, name = "name")
	private String name;

	@Min(0)
	@Column(nullable = false, name = "price")
	private Integer price;

	@Min(0)
	@Column(nullable = false, name = "stock")
	@ColumnDefault("0")
	private Integer stock;

	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
	@Builder.Default
	@ToString.Exclude
	private List<ItemImage> images = new ArrayList<>();

	public List<ItemImage> getImages() {
		if (images == null) {
			images = new ArrayList<>();
		}
		return images;
	}
}
