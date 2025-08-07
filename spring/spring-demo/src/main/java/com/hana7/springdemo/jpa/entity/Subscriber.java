package com.hana7.springdemo.jpa.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"roles"})
public class Subscriber {
	@Id
	private String email;

	private String pwd;

	@Column(nullable = false, length = 15)
	private String nickname;

	private boolean social;

	@ElementCollection(fetch = FetchType.LAZY)
	@JoinTable(name = "SubscriberRole",
		joinColumns = @JoinColumn(name = "email")
	)
	@Column(name = "role")
	@Builder.Default
	private List<SubscriberRole> roles = new ArrayList<>();

	public Subscriber addRole(SubscriberRole role) {
		if (roles == null)
			roles = new ArrayList<>();
		roles.add(role);
		return this;
	}

	public void clearRoles() {
		if (roles != null)
			roles.clear();
	}
}
