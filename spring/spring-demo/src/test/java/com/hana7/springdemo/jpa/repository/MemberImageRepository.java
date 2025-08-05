package com.hana7.springdemo.jpa.repository;

import org.springframework.data.repository.Repository;

import com.hana7.springdemo.jpa.entity.MemberImage;

interface MemberImageRepository extends Repository<MemberImage, Integer> {
}
