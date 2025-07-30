package com.hana7.springdemo.jpa.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Board extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(length = 40, nullable = false)
	private String title;

	@Column(length = 30, nullable = false)
	private String writer;

	@Column(nullable = false)
	@ColumnDefault("0")
	private int hit;

	@OneToOne(mappedBy = "board", cascade = CascadeType.ALL)
	private BoardContent content;

	@OneToMany(mappedBy = "board")
	private List<Reply> replies = new ArrayList<>();

	public void setContent(BoardContent content) {
		this.content = content;
		if (content != null)
			content.setBoard(this);
	}
}
