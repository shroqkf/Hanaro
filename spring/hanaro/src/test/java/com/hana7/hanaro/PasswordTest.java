package com.hana7.hanaro;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class PasswordTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    // @Test
    // void generatePasswordHash() {
    //     String rawPassword = "userpassword";
    //     String encodedPassword = passwordEncoder.encode(rawPassword);
    //     System.out.println("Encoded Password: " + encodedPassword);
    // }

    @Test
    void generatePasswordHash() {
        String rawPassword = "adminpassword";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded Password: " + encodedPassword);
    }
}
