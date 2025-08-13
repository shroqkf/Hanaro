-- 1) USER: 관리자/일반 사용자
INSERT INTO User (name, email, password, role) VALUES
    ('관리자', 'admin@gmail.com', '$2a$10$2fBR8j2ogTzDIA268yLalO2wj5LPewdOdZkpEHDvKGzKUCXGSBfT.', 'ROLE_ADMIN'),
    ('사용자', 'user@gmail.com',  '$2a$10$txqsT7NtPezqohSE95M9wuh/7p7jRmDmZJNgLIOcnupT.Nh.5ru/O', 'ROLE_USER');

-- 2) ITEM
INSERT INTO Item (price, stock, name) VALUES
    (12000, 100, '무지 반팔티'),
    (20000, 50, '데님 팬츠'),
    (30000, 30, '캔버스 스니커즈');

-- 3) ORDER: 오늘/어제 데이터(매출 통계용)
INSERT INTO Orders (totalPrice, userId, status) VALUES
    (24000, 2, 'PAID'),
    (100000, 2, 'COMPLETED');

-- 4) ORDER_ITEMS: 주문별 상세
INSERT INTO OrderItem (price, quantity, orderId, productId) VALUES
    (10000,3,1, 1),  -- 오늘 주문: 반팔티 2장(3만원)
    (20000,2,2,2),  -- 어제 주문: 데님 2개(4만원)
    (30000,1,1,3);  -- 오늘 주문: 스니커즈 1개(3만원)

-- 5) CART: 사용자 장바구니
INSERT INTO Cart (userId) VALUES
    (2);   -- 사용자의 장바구니에 총 3개의 상품 등록

-- 6) CART_ITEMS: 장바구니별 상세
INSERT INTO CartItem (quantity,cartId, productId ) VALUES
    (1,1,1),    -- 사용자의 장바구니에 '무지 반팔티' 1개 추가
    (2,1,2);    -- 사용자의 장바구니에 '데님 팬츠' 2개 추가
