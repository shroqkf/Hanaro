package com.hana7.springdemo.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Memo extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mno;

	@Column(nullable = false, length = 200)
	private String memoText;
}
