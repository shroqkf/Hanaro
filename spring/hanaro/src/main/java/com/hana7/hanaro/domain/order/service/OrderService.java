package com.hana7.hanaro.domain.order.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hana7.hanaro.common.exception.CartBadRequestException;
import com.hana7.hanaro.common.exception.CartNotFoundException;
import com.hana7.hanaro.common.exception.OrderCreationException;
import com.hana7.hanaro.common.security.exception.UserNotFoundException;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.entity.CartItem;
import com.hana7.hanaro.domain.cart.repository.CartRepository;
import com.hana7.hanaro.domain.cart.repository.CartItemRepository;
import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderItem;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.order.repository.OrderItemRepository;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;

import com.hana7.hanaro.domain.order.dto.OrderResponseDTO;
import com.hana7.hanaro.domain.order.dto.OrderItemResponseDTO;

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
		if (cartItems.isEmpty()) {
			throw new CartBadRequestException();
		}
		int totalPrice=cartItems.stream().mapToInt(item->{
			int price = item.getItem().getPrice();
			int quantity = item.getQuantity();
			return price * quantity;
		}).sum();

		// 새 주문 생성
		Order order = Order.builder()
			.status(OrderState.PAID)
			.totalPrice(totalPrice)
			.build();

		Order finalOrder;
		try {
			finalOrder = orderRepository.save(order);
		} catch (Exception e) {
			throw new OrderCreationException();
		}

		cartItems.forEach(cartItem->{
			OrderItem orderItem = OrderItem.builder()
				.order(finalOrder)
				.item(cartItem.getItem())
				.quantity(cartItem.getQuantity())
				.price(cartItem.getItem().getPrice())
				.build();
			try {
				orderItemRepository.save(orderItem);
			} catch (Exception e) {
				throw new OrderCreationException();
			}
		});
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

	// 모든 주문 조회 (관리자용)
	public List<OrderResponseDTO> getAllOrders() {
		List<Order> orders = orderRepository.findAll();
		return getOrderResponseDTOS(orders);
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
