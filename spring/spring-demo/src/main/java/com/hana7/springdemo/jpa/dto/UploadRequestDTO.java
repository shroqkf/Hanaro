package com.hana7.springdemo.jpa.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UploadRequestDTO {
	List<MultipartFile> files;
}
