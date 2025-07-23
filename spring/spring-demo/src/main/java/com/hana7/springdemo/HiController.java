package com.hana7.springdemo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class HiController {
	@GetMapping("/hi")
	public String hi(String name){
		log.debug("Debug = {}", name);
		log.info("Hi! INFO");
		return "Hi! "+name;
	}
	@GetMapping("/hi/{name}")
	public String hiName(@PathVariable("name") String name){
		log.debug("hiName={}",name);
		return "Hi "+name;
	}

	@GetMapping(value = "/hi/{time}", params = "q=1")
	public String Time1(@PathVariable("time") String time){
		return "1: Good "+time;
	}

	@GetMapping(value = "/hi/{time}", params = "q=2")
	public String Time2(@PathVariable("time") String time){
		return "2: Good "+time;
	}
}
