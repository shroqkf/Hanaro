package com.hana7.springdemo.security.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana7.springdemo.jpa.dto.SubscriberDTO;
import com.hana7.springdemo.security.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		System.out.println("** SuccessHandler = " + authentication);

		SubscriberDTO d = (SubscriberDTO)authentication.getPrincipal();
		SubscriberDTO dto = new SubscriberDTO(d.getEmail(), "", d.getNickname(), d.isSocial(), d.getRoleNames());
		Map<String, Object> claims = dto.getClaims();
		claims.put("accessToken", JwtUtil.generateToken(claims, 10));
		claims.put("refreshToken", JwtUtil.generateToken(claims, 60 * 24));

		ObjectMapper objectMapper = new ObjectMapper();
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println(objectMapper.writeValueAsString(claims));
		out.close();
	}
}
