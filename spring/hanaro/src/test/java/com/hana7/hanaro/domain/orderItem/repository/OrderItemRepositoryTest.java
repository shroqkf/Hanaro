package com.hana7.hanaro.domain.orderItem.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.item.repository.ItemRepository;
import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.order.repository.OrderItemRepository;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.order.entity.OrderItem;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class OrderItemRepositoryTest extends RepositoryTest {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    private User testUser;
    private Item testItem;
    private Order testOrder;

    @BeforeEach
    void setUp() {
        // Ensure clean state
        orderItemRepository.deleteAll();
        orderRepository.deleteAll();
        itemRepository.deleteAll();
        userRepository.deleteAll();

        // Create and save dependencies
        testUser = userRepository.save(User.builder()
                .name("주문아이템유저")
                .email("orderitem@gmail.com")
                .password("testPassword")
                .role(UserRole.ROLE_USER)
                .build());

        testItem = itemRepository.save(Item.builder()
                .name("주문아이템테스트상품")
                .price(99000)
                .stock(10)
                .build());

        testOrder = orderRepository.save(Order.builder()
                .user(testUser)
                .totalPrice(0)
                .status(OrderState.PAID)
                .build());
    }

    @Test
    @DisplayName("주문 아이템 저장 및 ID로 조회 테스트")
    void saveAndFindByIdTest() {
        // given
        OrderItem orderItem = OrderItem.builder()
                .order(testOrder)
                .item(testItem)
                .price(99000)
                .quantity(1)
                .build();

        // when
        OrderItem savedOrderItem = orderItemRepository.save(orderItem);

        // then
        OrderItem foundOrderItem = orderItemRepository.findById(savedOrderItem.getId()).orElseThrow();

        assertThat(foundOrderItem.getId()).isEqualTo(savedOrderItem.getId());
        assertThat(foundOrderItem.getOrder().getId()).isEqualTo(testOrder.getId());
        assertThat(foundOrderItem.getItem().getName()).isEqualTo(testItem.getName());
        assertThat(foundOrderItem.getPrice()).isEqualTo(99000);
        assertThat(foundOrderItem.getQuantity()).isEqualTo(1);
    }
}
