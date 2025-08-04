package com.hana7.springdemo.jpa.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana7.springdemo.jpa.dto.ErrorResponseDTO;
import com.hana7.springdemo.jpa.dto.MemberDTO;
import com.hana7.springdemo.jpa.dto.SearchCond;
import com.hana7.springdemo.jpa.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/members")
public class MemberController {
	private final MemberService service;

	public MemberController(MemberService service) {
		this.service = service;
	}

	@GetMapping()
	@Tag(name = "회원 목록", description = "회원 페이징 목록")
	@Operation(summary = "/members?page=1...", description = "회원목록")
	List<MemberDTO> findMembers(
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

	@GetMapping("{id}")
	@Tag(name = "회원 상세")
	@Operation(summary = "/members/2", description = "회원 작성된 글 포함")
	@Parameters({
		@Parameter(name = "id", description = "회원 번호", example = "2"),
	})
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청에 성공하였습니다."),
		@ApiResponse(responseCode = "404", description = "해당 멤버를 찾을 수 없습니다.",
			content = @Content(mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponseDTO.class)))
	})
	MemberDTO getMember(@PathVariable Long id) {
		return service.findOne(id);
	}

	@DeleteMapping("{id}")
	@Tag(name = "회원 삭제")
	@Operation(summary = "/members/2", description = "회원 작성된 글 포함")
	@Parameters({
		@Parameter(name = "id", description = "회원 번호", example = "2"),
	})
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청에 성공하였습니다."),
		@ApiResponse(responseCode = "404", description = "요청에 실패하였습니다.",
			content = @Content(mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponseDTO.class)))
	})
	long remove(@PathVariable Long id) {
		return service.remove(id);
	}
}
