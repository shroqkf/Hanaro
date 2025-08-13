package com.hana7.hanaro.domain.order.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.UserRole;
import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.item.repository.ItemRepository;
import com.hana7.hanaro.domain.order.entity.Order;
import com.hana7.hanaro.domain.order.entity.OrderState;
import com.hana7.hanaro.domain.order.entity.OrderItem;
import com.hana7.hanaro.domain.user.entity.User;
import com.hana7.hanaro.domain.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class OrderRepositoryTest extends RepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    private User testUser;
    private Item testItem;

    @BeforeEach
    void setUp() {
        orderRepository.deleteAll();
        itemRepository.deleteAll();
        userRepository.deleteAll();

        testUser = userRepository.save(User.builder()
                .name("주문유저")
                .email("order@gmail.com")
                .password("testPassword")
                .role(UserRole.ROLE_USER)
                .build());

        testItem = itemRepository.save(Item.builder()
                .name("주문테스트상품")
                .price(15000)
                .stock(5)
                .build());
    }

    @Test
    @DisplayName("주문 저장 및 ID로 조회 테스트")
    void saveAndFindByIdTest() {
        // given
        Order order = Order.builder()
                .user(testUser)
                .totalPrice(30000)
                .status(OrderState.PAID)
                .build();

        OrderItem orderItem = OrderItem.builder()
                .order(order)
                .item(testItem)
                .price(15000)
                .quantity(2)
                .build();
        order.getOrderItems().add(orderItem);


        // when
        Order savedOrder = orderRepository.save(order);

        // then
        Order foundOrder = orderRepository.findById(savedOrder.getId()).orElseThrow();

        assertThat(foundOrder.getId()).isEqualTo(savedOrder.getId());
        assertThat(foundOrder.getUser().getName()).isEqualTo(testUser.getName());
        assertThat(foundOrder.getStatus()).isEqualTo(OrderState.PAID);
        assertThat(foundOrder.getOrderItems()).hasSize(1);
        assertThat(foundOrder.getOrderItems().get(0).getItem().getName()).isEqualTo(testItem.getName());
    }

    @Test
    @DisplayName("상태와 생성일시로 주문 조회 테스트")
    void findByStatusAndCreatedAtBetweenTest() {
        // given
        Order order1 = orderRepository.save(Order.builder()
                .user(testUser)
                .totalPrice(1000)
                .status(OrderState.PAID)
                .build());
        try { Thread.sleep(10); } catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
        Order order2 = orderRepository.save(Order.builder()
                .user(testUser)
                .totalPrice(2000)
                .status(OrderState.PROCESSING)
                .build());
        try { Thread.sleep(10); } catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
        Order order3 = orderRepository.save(Order.builder()
                .user(testUser)
                .totalPrice(3000)
                .status(OrderState.PAID)
                .build());

        LocalDateTime start = order1.getCreatedAt().minusSeconds(1);
        LocalDateTime end = order3.getCreatedAt().plusSeconds(1);

        // when
        List<Order> foundOrders = orderRepository.findByStatusAndCreatedAtBetween(OrderState.PAID, start, end);

        // then
        assertThat(foundOrders).hasSize(2);
        assertThat(foundOrders).extracting(Order::getId).contains(order1.getId(), order3.getId());
        assertThat(foundOrders).extracting(Order::getId).doesNotContain(order2.getId());
    }
}
