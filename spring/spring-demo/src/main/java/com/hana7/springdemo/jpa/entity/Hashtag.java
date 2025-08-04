package com.hana7.springdemo.jpa.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"boards"})
public class Hashtag extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 15, unique = true)
	// @UniqueConstraint(name = "uk_Hashtag_tag")
	private String tag;

	@ManyToMany
	@JoinTable(name = "HashtagBoard",
		joinColumns = @JoinColumn(name = "hashtag",
			foreignKey = @ForeignKey(name = "fk_HashtagBoard_hashtag",
				foreignKeyDefinition = "foreign key (hashtag) references Hashtag(id) on Delete cascade")
		),
		inverseJoinColumns = @JoinColumn(name = "board",
			foreignKey = @ForeignKey(name = "fk_HashtagBoard_board",
				foreignKeyDefinition = "on Delete cascade")
		)
	)
	private List<Board> boards;

	public void addBoard(Board board) {
		if (boards == null)
			boards = new ArrayList<>();
		boards.add(board);
	}
}
