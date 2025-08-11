package com.hana7.hanaro.domain.item.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.hana7.hanaro.common.entity.BaseEntity;
import com.hana7.hanaro.domain.itemImage.entity.ItemImage;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class Item extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "bigint unsigned", unique = true)
	private Long id;

	@NotBlank
	@Column(length = 30, nullable = false, name = "name")
	private String name;


	@Column(nullable = false, name = "price")
	private Integer price;

	@Column(nullable = false, name = "quantity")
	@ColumnDefault("0")
	private Integer quantity;

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
