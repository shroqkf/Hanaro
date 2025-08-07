package com.hana7.springdemo.jpa.controller.advice;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hana7.springdemo.security.exception.CustomJwtException;

@RestControllerAdvice
public class CustomControllerAdvice {
	@ExceptionHandler(CustomJwtException.class)
	protected ResponseEntity<?> handleJwtException(CustomJwtException e) {
		String msg = e.getMessage();
		System.out.println("msg = " + msg);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", msg));
	}
}
