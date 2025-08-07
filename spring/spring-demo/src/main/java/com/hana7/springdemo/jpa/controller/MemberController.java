package com.hana7.springdemo.jpa.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.coobird.thumbnailator.Thumbnailator;

import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.MemberImageDTO;
import com.hana7.springdemo.jpa.dto.SearchCond;
import com.hana7.springdemo.jpa.dto.UploadRequestDTO;
import com.hana7.springdemo.jpa.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
	private final MemberService service;

	@Value("${upload.path}")
	private String uploadPath = "src/main/resources";

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping()
	@Tag(name = "회원 목록", description = "회원 페이징 목록")
	@Operation(summary = "/members?page=1...", description = "회원목록")
	public List<MemberDTO> findMembers(
		@Parameter(example = """
			{
				"page": 1,
				"size": 5,
				"searchNickname": "x",
				"searchEmail:: null,
				"sortField": "id",
				"sortDirection" : "asc"
			}
			""")
		SearchCond searchCond) {
		System.out.println("searchCond = " + searchCond.getPager());
		return service.findAll(searchCond);
	}

	@PreAuthorize("hasAnyRole('ROLE_MANAGER')")
	@GetMapping("{id}")
	@Tag(name = "회원 상세")
	@Operation(summary = "/members/2", description = "회원 작성된 글 포함")
	@Parameters({
		@Parameter(name = "id", description = "회원 번호", example = "2"),
	})
	public MemberDTO getMember(@PathVariable Long id) {
		return service.findOne(id);
	}

	@Tag(name = "file upload")
	@Operation(summary = "Upload POST Member")
	@PostMapping(value = "/{id}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public List<MemberImageDTO> upload(UploadRequestDTO dto, @PathVariable Long id) {
		log.info("upfileDto={}", dto);
		log.info("uploadPath={}", uploadPath);
		List<MemberImageDTO> upfiles = new ArrayList<>();

		if (dto.getFiles() != null) {
			dto.getFiles().forEach(file -> {
				String orgFname = file.getOriginalFilename();
				log.info("orgName={}", orgFname + "::" + file.getSize() / 1024);
				String uuid = UUID.randomUUID().toString();
				String savedFname = uuid + "_" + orgFname;
				try {
					String savedir = getTodayPath();
					Path uploadDir = Paths.get(uploadPath + File.separator + savedir);
					Path upfilePath = Paths.get(uploadPath + File.separator + savedir + File.separator + savedFname);
					if (!Files.exists(uploadDir)) {
						Files.createDirectories(uploadDir);
					}
					file.transferTo(upfilePath);

					boolean isImage = Files.probeContentType(upfilePath).startsWith("image");
					if (isImage) {
						File thumbnail = new File(uploadPath + File.separator + savedir + File.separator,
							"thumb_" + uuid + "_" + orgFname);
						Thumbnailator.createThumbnail(upfilePath.toFile(), thumbnail, 200, 200);
					}

					upfiles.add(MemberImageDTO.builder()
						.orgname(orgFname)
						.savename(savedFname)
						.savedir(savedir)
						.build());

				} catch (IOException e) {
					log.error(e.getMessage());
					throw new RuntimeException(e);
				}
			});
		}

		if (!upfiles.isEmpty()) {
			service.uploadImages(id, upfiles);
		}

		return upfiles;
	}

	private String getTodayPath() {
		LocalDateTime now = LocalDateTime.now();
		return String.format("%4d/%02d/%02d", now.getYear(), now.getMonthValue(), now.getDayOfMonth());
	}

	@Tag(name = "Download File")
	@Operation(summary = "Download Image")
	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFile(@PathVariable String fileName,
		@RequestParam(required = true) String savedir) throws IOException {
		Resource resource = new FileSystemResource(uploadPath + File.separator + savedir + File.separator + fileName);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(resource.getFile().toPath()));

		return ResponseEntity.ok().headers(headers).body(resource);
	}

	@Tag(name = "Delete File")
	@Operation(summary = "Delete Image")
	@GetMapping("/delete/{fileName}")
	public Map<String, Boolean> deleteFile(@PathVariable String fileName) throws IOException {
		Map<String, Boolean> resMap = new HashMap<>();

		Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);
		resMap.put(resource.getFile().getName(), resource.getFile().delete());
		if (Files.probeContentType(resource.getFile().toPath()).startsWith("image")) {
			File thumbnail = new File(uploadPath, "thumb_" + fileName);
			resMap.put(thumbnail.getName(), thumbnail.delete());
		}
		System.out.println("resMap = " + resMap);
		return resMap;
	}

	@DeleteMapping("{id}")
	ResponseEntity<?> remove(@PathVariable Long id) {
		long ret = service.remove(id);
		if (ret > 0)
			return ResponseEntity.ok(ret);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(id + "is Not Found!");
	}
}
