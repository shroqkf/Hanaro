package com.hana7.springdemo.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class BoardContent extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Lob
	@Column(columnDefinition = "TEXT", nullable = false)
	private String content;

	@OneToOne(optional = false)
	@JoinColumn(
		foreignKey = @ForeignKey(name = "fk_BoardContent_board"))
	private Board board;

	public BoardContent(String content) {
		this.content = content;
	}

	public BoardContent(String content, Board board) {
		this(content);
		this.board = board;
	}
}
