package com.hana7.springdemo.jpa.dto;

import com.hana7.springdemo.jpa.entity.Member;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class MemberRequestDTO extends MemberDTO {
	private String passwd;

	protected Member toEntity() {
		Member mbr = super.toEntity();
		mbr.setPasswd(passwd);

		return mbr;
	}
}
