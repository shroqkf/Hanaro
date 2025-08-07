package com.hana7.springdemo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class HiController {
	@GetMapping("/hi")
	public String hi(@RequestParam(required = true) String name) {
		log.debug("Debug={}", name);
		log.info("Hi! INFO!!");
		return "Hi! " + name;
	}

	@GetMapping("/hi/{time}")
	public String hiName(@PathVariable("time") String time) {
		log.debug("hiName={}", time);
		return "Good " + time;
	}

	@GetMapping(value = "/hi/{time}", params = "q=1")
	public String hiName1(@PathVariable("time") String time) {
		return "1: Good " + time;
	}

	@GetMapping(value = "/hi/{time}", params = "q=2")
	public String hiName2(@PathVariable("time") String time) {
		return "2: Good " + time;
	}
}
