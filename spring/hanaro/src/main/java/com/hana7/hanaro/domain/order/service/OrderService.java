package com.hana7.hanaro.domain.order.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hana7.hanaro.common.exception.CartNotFoundException;
import com.hana7.hanaro.common.security.exception.UserNotFoundException;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.repository.CartRepository;
import com.hana7.hanaro.domain.cartItem.entity.CartItem;
import com.hana7.hanaro.domain.cartItem.repository.CartItemRepository;
import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.orderItem.entity.OrderItem;
import com.hana7.hanaro.domain.orderItem.repository.OrderItemRepository;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;

import com.hana7.hanaro.domain.order.dto.OrderResponseDTO;
import com.hana7.hanaro.domain.orderItem.dto.OrderItemResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final OrderItemRepository orderItemRepository;

	// 주문 생성
	public void createOrder(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = authentication.getName();
		User user = userRepository.findByEmail(userName).orElseThrow(UserNotFoundException::new);

		Cart cart= cartRepository.findByUser(user).orElseThrow(CartNotFoundException::new);

		List<CartItem> cartItems = cartItemRepository.findByCart(cart);
		int totalPrice=cartItems.stream().mapToInt(item->{
			int price = item.getItem().getPrice();
			int quantity = item.getQuantity();
			return price * quantity;
		}).sum();

		// 새 주문 생성
		// TODO: exception 처리
		Order order = Order.builder()
			.user(user)
			.status(OrderState.PAID)
			.totalPrice(totalPrice)
			.build();

		// foreach 문 속 final 객체
		// TODO: exception 처리
		Order finalOrder=orderRepository.save(order);

		cartItems.forEach(cartItem->{
			OrderItem orderItem = OrderItem.builder()
				.order(finalOrder)
				.item(cartItem.getItem())
				.quantity(cartItem.getQuantity())
				.price(cartItem.getItem().getPrice())
				.build();
			orderItemRepository.save(orderItem);
		});
	}

	// 모든 주문 조회 (관리자용)
	public List<OrderResponseDTO> getAllOrders() {
		List<Order> orders = orderRepository.findAll();
		return getOrderResponseDTOS(orders);
	}

	private List<OrderResponseDTO> getOrderResponseDTOS(List<Order> orders) {
		return orders.stream().map(order -> {
			List<OrderItemResponseDTO> orderItemDTOs = order.getOrderItems().stream()
				.map(orderItem -> OrderItemResponseDTO.builder()
					.itemId(orderItem.getItem().getId())
					.itemName(orderItem.getItem().getName())
					.price(orderItem.getPrice())
					.quantity(orderItem.getQuantity())
					.build())
				.collect(Collectors.toList());

			return OrderResponseDTO.builder()
				.orderId(order.getId())
				.userId(order.getUser().getId())
				.userEmail(order.getUser().getEmail())
				.userName(order.getUser().getName())
				.totalPrice(order.getTotalPrice())
				.status(order.getStatus())
				.orderItems(orderItemDTOs)
				.build();
		}).collect(Collectors.toList());
	}

	// 사용자 주문 내역 조회
	public List<OrderResponseDTO> getUserOrders() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = authentication.getName();
		User user = userRepository.findByEmail(userName).orElseThrow(UserNotFoundException::new);

		List<Order> orders = orderRepository.findByUser(user);
		return getOrderResponseDTOS(orders);
	}
}
