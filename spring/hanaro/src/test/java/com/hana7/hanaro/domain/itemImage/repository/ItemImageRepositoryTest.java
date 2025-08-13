package com.hana7.hanaro.domain.itemImage.repository;

import com.hana7.hanaro.common.RepositoryTest;
import com.hana7.hanaro.domain.cart.repository.CartItemRepository;
import com.hana7.hanaro.domain.item.entity.Item;
import com.hana7.hanaro.domain.item.repository.ItemImageRepository;
import com.hana7.hanaro.domain.item.repository.ItemRepository;
import com.hana7.hanaro.domain.item.entity.ItemImage;
import com.hana7.hanaro.domain.order.repository.OrderItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Commit;

import static org.assertj.core.api.Assertions.assertThat;

class ItemImageRepositoryTest extends RepositoryTest {

    @Autowired
    private ItemImageRepository itemImageRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    private Item testItem;

    @BeforeEach
    void setUp() {
        cartItemRepository.deleteAll();
        orderItemRepository.deleteAll();
        itemImageRepository.deleteAll();
        itemRepository.deleteAll();

        testItem = itemRepository.save(Item.builder()
                .name("이미지테스트상품")
                .price(12345)
                .stock(100)
                .build());
    }

    @Test
    @DisplayName("상품 이미지 저장 및 ID로 조회 테스트")
    void saveAndFindByIdTest() {
        // given
        ItemImage itemImage = ItemImage.builder()
                .item(testItem)
                .orgName("original_image.jpg")
                .saveName("saved_image.jpg")
                .saveDir("/upload/2025/08/13")
                .build();

        // when
        ItemImage savedItemImage = itemImageRepository.save(itemImage);

        // then
        ItemImage foundItemImage = itemImageRepository.findById(savedItemImage.getId()).orElseThrow();

        assertThat(foundItemImage.getId()).isEqualTo(savedItemImage.getId());
        assertThat(foundItemImage.getItem().getId()).isEqualTo(testItem.getId());
        assertThat(foundItemImage.getOrgName()).isEqualTo("original_image.jpg");
        assertThat(foundItemImage.getSaveName()).isEqualTo("saved_image.jpg");
    }
}
