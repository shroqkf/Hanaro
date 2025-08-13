package com.hana7.hanaro.domain.item.controller;

import com.hana7.hanaro.domain.item.dto.ItemDetailResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import java.util.stream.Collectors;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hana7.hanaro.domain.item.dto.ItemRequestDTO;
import com.hana7.hanaro.domain.item.dto.ItemResponseDTO;
import com.hana7.hanaro.domain.item.repository.ItemRepository;
import com.hana7.hanaro.domain.item.service.ItemService;

import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;

@Tag(name = "상품")
@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {
	private final ItemRepository itemRepository;
	private final ItemService itemService;

	@Operation(summary = "상품 등록 (관리자용)")
	@PostMapping(value="",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> insertItem(@Validated ItemRequestDTO itemRequestDTO) {
		itemService.insertItem(itemRequestDTO);

		return ResponseEntity.ok().build();
	}

	@Operation(summary = "상품 조회 (관리자용)")
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ItemDetailResponseDTO> getItemDetail(@PathVariable Long id, HttpServletRequest request) {
		return getItemDetailResponseDTOResponseEntity(id, request);
	}

	private ResponseEntity<ItemDetailResponseDTO> getItemDetailResponseDTOResponseEntity(
		@PathVariable Long id, HttpServletRequest request) {
		ItemDetailResponseDTO itemDetail = itemService.findItemDetailById(id);
		String baseUrl = String.format("%s://%s:%d", request.getScheme(), request.getServerName(), request.getServerPort());
		itemDetail.setImageUrls(
			itemDetail.getImageUrls().stream()
				.map(url -> baseUrl + url)
				.collect(Collectors.toList())
		);
		return ResponseEntity.ok(itemDetail);
	}

	@Operation(summary = "상품 목록 조회")
	@GetMapping("/search")
	public ResponseEntity<Page<ItemResponseDTO>> searchItem(@RequestParam(value = "keyword", required = false) String keyword,
		@ParameterObject @PageableDefault(size = 10, page = 0, sort = "name") Pageable pageable) {
		return ResponseEntity.ok(itemService.findItem(keyword,pageable));
	}

	@Operation(summary = "상품 상세 조회")
	@GetMapping("/detail/{id}")
	public ResponseEntity<ItemDetailResponseDTO> getItemDetailForUser(@PathVariable Long id, HttpServletRequest request) {
		return getItemDetailResponseDTOResponseEntity(id, request);
	}

	@Operation(summary = "재고 수량 조정 (관리자용)")
	@PatchMapping(value = "{id}/stock")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateItemQuantity(
		@PathVariable Long id,
		@RequestParam @Min(0) int quantity
	) {
		itemService.modifyItemQuantity(id, quantity);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "상품 삭제 (관리자용)")
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
		itemService.deleteItem(id);
		return ResponseEntity.ok().build();

	}
}
