package com.hana7.springdemo.security;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import com.hana7.springdemo.security.exception.CustomJwtException;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;

public class JwtUtil {
	private static final SecretKey K = Keys.hmacShaKeyFor("yek".getBytes(StandardCharsets.UTF_8));

	public static String generateToken(Map<String, Object> valueMap, int min) {
		// SecretKey key = Keys.hmacShaKeyFor(KEY.getBytes(StandardCharsets.UTF_8));
		// SecretKey key = Keys.hmacShaKeyFor(JwtUtil.KEY.getBytes());

		String jwtStr = Jwts.builder().setHeader(Map.of("typ", "JWT"))
			.setClaims(valueMap)
			.setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
			.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
			.signWith(K).compact();
		System.out.println("jwtStr = " + jwtStr);
		return jwtStr;
	}

	public static Map<String, Object> validateToken(String token) {
		Map<String, Object> claim = null;
		SecretKey key = null;

		try {
			// key = Keys.hmacShaKeyFor(JwtUtil.KEY.getBytes(StandardCharsets.UTF_8));
			// key = Keys.hmacShaKeyFor(JwtUtil.KEY.getBytes());
			claim = Jwts.parserBuilder()
				.setSigningKey(K)
				.build()
				.parseClaimsJws(token).getBody();
		} catch (WeakKeyException e) {
			throw new CustomJwtException("WeakException");
		}

		return claim;
	}
}
