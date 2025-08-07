package com.hana7.springdemo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class HelloController {
	private static final Logger logger = LoggerFactory.getLogger(HelloController.class);

	@GetMapping("/hello")
	public String[] hello(HttpServletRequest req, String name) {
		logger.debug("name={}", name);
		logger.debug("Debug");
		logger.warn("Warning");
		logger.info("info");
		return new String[]{"Hello", "World!"};
	}
}
