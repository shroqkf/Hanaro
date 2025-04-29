show create database testdb;

create table T (
	id int not null auto_increment primary key,
    name varchar(31) not null 
) ;

show create table T;

insert into T(name) values('홍길동');

select * from T;

CREATE TABLE `T` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;