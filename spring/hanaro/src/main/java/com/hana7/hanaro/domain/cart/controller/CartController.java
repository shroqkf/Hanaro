package com.hana7.hanaro.domain.cart.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hana7.hanaro.common.exception.CartItemInsertBadRequestException;
import com.hana7.hanaro.domain.cart.dto.CartRequestDTO;
import com.hana7.hanaro.domain.cart.dto.CartResponseDTO;
import com.hana7.hanaro.domain.cart.dto.CartUpdateRequestDTO;
import com.hana7.hanaro.domain.cart.service.CartService;
import com.hana7.hanaro.domain.cart.dto.CartItemDeleteRequestDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import lombok.extern.log4j.Log4j2;

@Tag(name = "장바구니")
@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
@Log4j2
public class CartController {
	private final CartService cartService;

	@Operation(summary = "장바구니 담기")
	@PostMapping
	public ResponseEntity<?> addCartItem(@RequestBody @Valid CartRequestDTO cartRequestDTO) throws
		CartItemInsertBadRequestException {
		cartService.addItem(cartRequestDTO);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "장바구니 조회")
	@GetMapping
	public ResponseEntity<CartResponseDTO> getCart() {
		return ResponseEntity.ok(cartService.getCartByCurrentUser());
	}

	@Operation(summary = "장바구니 수정")
	@PatchMapping
	public ResponseEntity<?> updateCart(@RequestBody @Valid CartUpdateRequestDTO cartUpdateRequestDTO) {
		log.info("------ updateCart controller start ------");
		log.info(cartUpdateRequestDTO);
		cartService.updateCart(cartUpdateRequestDTO);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "장바구니 삭제")
	@DeleteMapping
	public ResponseEntity<?> deleteCartItem(@RequestBody CartItemDeleteRequestDTO cartItemDeleteRequestDTO) {
		cartService.deleteCart(cartItemDeleteRequestDTO);
		return ResponseEntity.ok().build();
	}
}
