package com.hana7.hanaro.domain.user.entity;

import jakarta.persistence.CascadeType;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.hana7.hanaro.common.entity.BaseEntity;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.cart.entity.Cart;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper=false)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder=true)
@DynamicInsert
@Table(name = "user")
public class User extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "bigint unsigned", unique = true)
	private Long id;

	@Column(length = 31, nullable = false)
	@ColumnDefault("'User'")
	private String name;

	@Column(name = "role", length = 20)
	@ColumnDefault("'ROLE_USER'")
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@Column(nullable = false, unique = true)
	@Email
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Cart cart;
}
