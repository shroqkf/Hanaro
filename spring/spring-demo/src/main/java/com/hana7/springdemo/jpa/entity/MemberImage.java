package com.hana7.springdemo.jpa.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberImage extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String orgname;
	private String savename;
	private String savedir;

	@ManyToOne()
	@JoinColumn(
		name = "member",
		foreignKey = @ForeignKey(
			name = "fk_MemberImage_member",
			foreignKeyDefinition = """
					foreign key (member)
					   references Member(id)
					    on DELETE cascade on UPDATE cascade
				"""
		)
	)
	private Member member;
}
