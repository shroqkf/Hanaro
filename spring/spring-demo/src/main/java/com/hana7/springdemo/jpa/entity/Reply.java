package com.hana7.springdemo.jpa.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Reply extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(length = 1000, nullable = false)
	private String reply;

	// @Column(length = 30, nullable = false)
	// private String replyer;
	@ManyToOne
	@JoinColumn(name = "replyer", nullable = false, foreignKey = @ForeignKey(name = "fk_Reply_replyer_Member"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member replyer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board",
		foreignKey = @ForeignKey(name = "fk_Reply_board"))
	// @ToString.Exclude
	private Board board;

	@Override
	public String toString() {
		return "Reply{" +
			"id=" + id +
			", reply='" + reply + '\'' +
			", replyer='" + replyer + '\'' +
			", board=" + board.getId() +
			'}';
	}
}
