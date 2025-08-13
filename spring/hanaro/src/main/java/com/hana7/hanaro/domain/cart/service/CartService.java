package com.hana7.hanaro.domain.cart.service;

import com.hana7.hanaro.common.exception.CartItemInsertBadRequestException;
import com.hana7.hanaro.common.exception.CartNotFoundException;
import com.hana7.hanaro.common.exception.ItemNotFoundException;
import com.hana7.hanaro.common.security.exception.UserNotFoundException;
import com.hana7.hanaro.domain.cart.dto.CartRequestDTO;
import com.hana7.hanaro.domain.cart.dto.CartResponseDTO;
import com.hana7.hanaro.domain.cart.dto.CartUpdateRequestDTO;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.entity.CartItem;
import com.hana7.hanaro.domain.cart.repository.CartRepository;
import com.hana7.hanaro.domain.cart.dto.CartItemDeleteRequestDTO;
import com.hana7.hanaro.domain.cart.dto.CartItemResponseDTO;
import com.hana7.hanaro.domain.cart.repository.CartItemRepository;
import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.item.repository.ItemRepository;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CartService {
	private final CartRepository cartRepository;
	private final UserRepository userRepository;
	private final ItemRepository itemRepository;
	private final CartItemRepository cartItemRepository;

	// 장바구니 담기
	public void addItem(CartRequestDTO cartRequestDTO) throws CartItemInsertBadRequestException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByEmail(username).orElseThrow(UserNotFoundException::new);
		Cart cart = cartRepository.findByUser(user).orElse(null);

		// user가 cart를 가지고 있지 않다면 만들어주기
		if (cart == null) {
			cart = Cart.builder()
				.user(user)
				.build();
			try{
				cartRepository.save(cart);
			} catch(Exception e){
				throw new CartItemInsertBadRequestException();
			}
		}

		Cart finalCart = cart;

		List<CartItem> cartItems = cartRequestDTO.getItems().stream()
			.map((cartItem) -> {
				Item item = itemRepository.findById(cartItem.getItemId()).orElseThrow(ItemNotFoundException::new);
				return cartItem.toEntity(finalCart, item);
			}).toList();

		try {
			cartItemRepository.saveAll(cartItems);
		} catch (Exception e) {
			throw new CartItemInsertBadRequestException();
		}
	}

	// 장바구니 조회
	public CartResponseDTO getCartByCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userName = authentication.getName();

		User user = userRepository.findByEmail(userName).orElseThrow(UserNotFoundException::new);
		Cart cart = cartRepository.findByUserIdWithCartItemsAndItems(user.getId()).orElse(null);

		if (cart == null) {
			return CartResponseDTO.builder()
				.cartId(null)
				.userId(user.getId())
				.cartItems(List.of())
				.build();
		}

		List<CartItemResponseDTO> cartItemResponseDTOS = cart.getCartItems().stream()
			.map(cartItem -> CartItemResponseDTO.builder()
				.itemId(cartItem.getItem().getId())
				.itemName(cartItem.getItem().getName())
				.price(cartItem.getItem().getPrice())
				.quantity(cartItem.getQuantity())
				.build())
			.collect(Collectors.toList());

		return CartResponseDTO.builder()
			.cartId(cart.getId())
			.userId(user.getId())
			.cartItems(cartItemResponseDTOS)
			.build();
	}

	// 장바구니 수정
	public void updateCart(CartUpdateRequestDTO cartUpdateRequestDTO) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		User user = userRepository.findByEmail(username).orElseThrow(UserNotFoundException::new);
		Cart cart = cartRepository.findByUser(user).orElseThrow(CartNotFoundException::new);

		cartUpdateRequestDTO.getCartItems().forEach((i)->{
			CartItem cartItem=cartItemRepository.findById(i.getCartItemId()).orElseThrow(ItemNotFoundException::new);
			if (!cartItem.getCart().getId().equals(cart.getId())) {
				throw new CartNotFoundException();
			}

			cartItem=cartItem.toBuilder().build();
			cartItemRepository.save(cartItem);
		});
	}

	// 장바구니 상품 삭제
	public void deleteCart(CartItemDeleteRequestDTO cartItemDeleteRequestDTO) {
		List<CartItem> items=cartItemRepository.findAllById(cartItemDeleteRequestDTO.getCartItemIds());

		cartItemRepository.deleteAll(items);
	}
}
