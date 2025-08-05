package com.hana7.springdemo.jpa.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hana7.springdemo.jpa.entity.MemberImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MemberImageDTO {
	private String orgname;
	private String savename;
	private String savedir;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Long memberId;

	public MemberImageDTO(MemberImage image) {
		orgname = image.getOrgname();
		savename = image.getSavename();
		savedir = image.getSavedir();
		memberId = image.getMember().getId();
	}

	public String getLink() {
		return "/members/view/" + savename + "?savedir=" + savedir;
	}

	public MemberImage toEntity() {
		return MemberImage.builder()
			.orgname(orgname)
			.savename(savename)
			.savedir(savedir)
			.build();
	}
}
