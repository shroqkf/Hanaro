package com.hana7.springdemo.jpa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hana7.springdemo.jpa.dto.BoardRequestDTO;
import com.hana7.springdemo.jpa.dto.BoardResponseDTO;
import com.hana7.springdemo.jpa.dto.ErrorResponseDTO;
import com.hana7.springdemo.jpa.service.BoardService;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/boards")
public class BoardController {
	private final BoardService service;

	public BoardController(BoardService service) {
		this.service = service;
	}

	@GetMapping
	public List<BoardResponseDTO> getPageList(@RequestParam(defaultValue = "1") int page,
		@RequestParam(defaultValue = "10") int countPerPage) {
		return service.getPageList(page, countPerPage);
	}

	@PostMapping()
	public BoardResponseDTO createBoard(@RequestBody @Validated BoardRequestDTO requestDTO) {
		return service.createBoard(requestDTO);
	}

	@GetMapping("/{id}")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청에 성공하였습니다.", content = @Content(mediaType = "application/json")),
		@ApiResponse(responseCode = "404",
			description = "해당 게시글을 찾을 수 없습니다~!",
			content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponseDTO.class)))
	})
	public ResponseEntity<?> getBoard(@PathVariable int id) {
		BoardResponseDTO board = service.getBoard(id);
		if (board != null)
			return ResponseEntity.ok(board);

		return ResponseEntity.status(404).body(
			new ErrorResponseDTO(id + "를 찾을 수 없습니다.", "NOT_FOUND"));
	}

	@PatchMapping("/{id}")
	public BoardResponseDTO chageBoard(@PathVariable int id, @RequestBody @Validated BoardRequestDTO requestDTO) {
		requestDTO.setId(id);
		return service.changeBoard(requestDTO);
	}

	@DeleteMapping("/{id}")
	public int removeBoard(@PathVariable int id) {
		service.removeBoard(id);
		return id;
	}

	// @PostMapping("/{id}/replies")
	// @PatchMapping("/{id}/replies/{replyId}")
	// @DeleteMapping("/{id}/replies/{replyId}")
}
