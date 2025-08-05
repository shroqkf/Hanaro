package com.hana7.springdemo.jpa.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadResponseDTO {
	private String orgFname;
	private String fname;
	private boolean isImage;

	public String getLink() {
		if (isImage)
			return "thumb_" + fname;

		return fname;
	}
}
