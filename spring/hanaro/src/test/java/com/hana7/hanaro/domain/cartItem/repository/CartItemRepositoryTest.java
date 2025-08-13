package com.hana7.hanaro.domain.cartItem.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.cart.entity.Cart;
import com.hana7.hanaro.domain.cart.repository.CartItemRepository;
import com.hana7.hanaro.domain.cart.repository.CartRepository;
import com.hana7.hanaro.domain.cart.entity.CartItem;
import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.item.repository.ItemRepository;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class CartItemRepositoryTest extends RepositoryTest {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

	private Item testItem;
    private Cart testCart;

    @BeforeEach
    void setUp() {
        cartItemRepository.deleteAll();
        cartRepository.deleteAll();
        itemRepository.deleteAll();
        userRepository.deleteAll();

		User testUser = userRepository.save(User.builder()
			.name("장바구니유저")
			.email("cart@gmail.com")
			.password("testPassword")
			.role(UserRole.ROLE_USER)
			.build());

        testItem = itemRepository.save(Item.builder()
                .name("장바구니테스트상품")
                .price(25000)
                .stock(30)
                .build());

        testCart = cartRepository.save(Cart.builder()
                .user(testUser)
                .build());
    }

    @Test
    @DisplayName("장바구니 아이템 저장 및 ID로 조회 테스트")
    void saveAndFindByIdTest() {
        // given
        CartItem cartItem = CartItem.builder()
                .cart(testCart)
                .item(testItem)
                .quantity(2)
                .build();

        // when
        CartItem savedCartItem = cartItemRepository.save(cartItem);

        // then
        CartItem foundCartItem = cartItemRepository.findById(savedCartItem.getId()).orElseThrow();

        assertThat(foundCartItem.getId()).isEqualTo(savedCartItem.getId());
        assertThat(foundCartItem.getCart().getId()).isEqualTo(testCart.getId());
        assertThat(foundCartItem.getItem().getName()).isEqualTo(testItem.getName());
        assertThat(foundCartItem.getQuantity()).isEqualTo(2);
    }

    @Test
    @DisplayName("장바구니로 아이템 목록 조회 테스트")
    void findByCartTest() {
        // given
        CartItem cartItem1 = cartItemRepository.save(CartItem.builder()
                .cart(testCart)
                .item(testItem)
                .quantity(1)
                .build());

        Item anotherItem = itemRepository.save(Item.builder().name("다른상품").price(1000).stock(10).build());
        CartItem cartItem2 = cartItemRepository.save(CartItem.builder()
                .cart(testCart)
                .item(anotherItem)
                .quantity(3)
                .build());

        // when
        List<CartItem> cartItems = cartItemRepository.findByCart(testCart);

        // then
        assertThat(cartItems).hasSize(2);
        assertThat(cartItems).extracting(CartItem::getId).contains(cartItem1.getId(), cartItem2.getId());
    }
}
