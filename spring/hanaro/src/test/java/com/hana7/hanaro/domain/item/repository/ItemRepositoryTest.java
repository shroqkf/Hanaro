package com.hana7.hanaro.domain.item.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.cartItem.repository.CartItemRepository;
import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.orderItem.repository.OrderItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Commit;

import static org.assertj.core.api.Assertions.assertThat;

class ItemRepositoryTest extends RepositoryTest {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    private Item testItem;

    @BeforeEach
    void setUp() {
        testItem = Item.builder()
                .name("테스트 상품")
                .price(10000)
                .quantity(100)
                .build();
    }

    @Test
    @DisplayName("상품 저장 및 ID로 조회 테스트")
    @Commit
    void saveAndFindByIdTest() {
        // when: 상품을 저장
        Item savedItem = itemRepository.save(testItem);

        // then: 저장된 상품을 ID로 다시 조회하여 검증
        Item foundItem = itemRepository.findById(savedItem.getId()).orElseThrow();

        assertThat(foundItem.getId()).isEqualTo(savedItem.getId());
        assertThat(foundItem.getName()).isEqualTo(testItem.getName());
        assertThat(foundItem.getPrice()).isEqualTo(testItem.getPrice());
        print(foundItem);
    }

    @Test
    @DisplayName("상품 이름으로 검색 테스트 (페이징 포함)")
    void findByNameContainsIgnoreCaseTest() {
        // given: 다른 테스트의 영향을 받지 않도록 데이터를 정리
        cartItemRepository.deleteAll();
        orderItemRepository.deleteAll();
        itemRepository.deleteAll();

        // and: 상품을 미리 저장
        itemRepository.save(testItem);
        Item anotherItem = Item.builder().name("특별 상품").price(20000).quantity(50).build();
        itemRepository.save(anotherItem);

        // when: '상품' 키워드로 검색
        Pageable pageable = PageRequest.of(0, 10);
        Page<Item> itemPage = itemRepository.findByNameContainsIgnoreCase("상품", pageable);

        // then: 조회된 결과가 2개인지 확인
        assertThat(itemPage.getTotalElements()).isEqualTo(2);
        assertThat(itemPage.getContent()).extracting(Item::getName).contains("테스트 상품", "특별 상품");
        print(itemPage.getContent());
    }
}
