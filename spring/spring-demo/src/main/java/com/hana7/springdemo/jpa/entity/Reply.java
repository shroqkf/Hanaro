package com.hana7.springdemo.jpa.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

	@ManyToOne
	@JoinColumn(name = "replyer", foreignKey = @ForeignKey(name = "fk_Reply_replyer_Member"), nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member replyer;

	@ManyToOne
	@JoinColumn(name = "board",
		foreignKey = @ForeignKey(name = "fk_Reply_board"))
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
