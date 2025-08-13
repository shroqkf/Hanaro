package com.hana7.hanaro.domain.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.access.prepost.PreAuthorize;

import com.hana7.hanaro.domain.order.service.OrderService;
import com.hana7.hanaro.domain.order.dto.OrderResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Tag(name = "주문")
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
	private final OrderService orderService;

	@Operation(summary = "주문 생성")
	@PostMapping
	public ResponseEntity<?> createOrder() {
		orderService.createOrder();
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "주문 내역 조회 (관리자용)")
	@GetMapping("/list")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
		return ResponseEntity.ok(orderService.getAllOrders());
	}

	@Operation(summary = "내 주문 내역 조회")
	@GetMapping("/my-list")
	public ResponseEntity<List<OrderResponseDTO>> getMyOrders() {
		return ResponseEntity.ok(orderService.getUserOrders());
	}
}
