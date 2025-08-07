package com.hana7.springdemo.jpa.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hana7.springdemo.jpa.dto.SubscriberDTO;
import com.hana7.springdemo.jpa.entity.Subscriber;
import com.hana7.springdemo.jpa.repository.SubscriberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final SubscriberRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("*** Service.loadUserByUsername: " + username);
		Subscriber subscriber = repository.getWithRoles(username);

		if (subscriber == null)
			throw new UsernameNotFoundException(username + " is Not Found!!");

		SubscriberDTO dto = new SubscriberDTO(subscriber.getEmail(), subscriber.getPwd(), subscriber.getNickname(),
			subscriber.isSocial(), subscriber.getRoles().stream().map(Enum::name).toList());
		System.out.println("dto = " + dto);
		return dto;
	}
}
