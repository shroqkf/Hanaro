-- MySQL dump 10.13  Distrib 9.3.0, for macos15.4 (arm64)
--
-- Host: 127.0.01    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Board`
--

DROP TABLE IF EXISTS `Board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Board` (
  `hit` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `writer` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Board`
--

LOCK TABLES `Board` WRITE;
/*!40000 ALTER TABLE `Board` DISABLE KEYS */;
INSERT INTO `Board` VALUES (0,1,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer1','Title1'),(0,2,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer2','Title2'),(0,3,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer3','Title3'),(0,4,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer4','Title4'),(0,5,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer5','Title5'),(0,6,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer6','Title6'),(0,7,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer7','Title7'),(0,8,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer8','Title8'),(0,9,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer9','Title9'),(0,10,'2025-07-29 07:21:24','2025-07-29 07:21:24','Writer10','Title10');
/*!40000 ALTER TABLE `Board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BoardContent`
--

DROP TABLE IF EXISTS `BoardContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BoardContent` (
  `board_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK5kykd367qyfkcpc0m93veb9jo` (`board_id`),
  CONSTRAINT `fk_BoardContent_board` FOREIGN KEY (`board_id`) REFERENCES `Board` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BoardContent`
--

LOCK TABLES `BoardContent` WRITE;
/*!40000 ALTER TABLE `BoardContent` DISABLE KEYS */;
INSERT INTO `BoardContent` VALUES (1,1,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(2,2,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(3,3,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(4,4,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(5,5,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(6,6,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(7,7,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(8,8,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(9,9,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx'),(10,10,'2025-07-29 07:21:24','2025-07-29 07:21:24','xxx');
/*!40000 ALTER TABLE `BoardContent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DemoUser`
--

DROP TABLE IF EXISTS `DemoUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DemoUser` (
  `age` smallint NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DemoUser`
--

LOCK TABLES `DemoUser` WRITE;
/*!40000 ALTER TABLE `DemoUser` DISABLE KEYS */;
INSERT INTO `DemoUser` VALUES (1,1,'2025-07-29 07:22:05','2025-07-29 07:22:05','Aa'),(2,2,'2025-07-29 07:22:05','2025-07-29 07:22:05','Bb'),(3,3,'2025-07-29 07:22:05','2025-07-29 07:22:05','Cc'),(1,4,'2025-07-29 07:22:05','2025-07-29 07:22:05','A'),(2,5,'2025-07-29 07:22:05','2025-07-29 07:22:05','B'),(3,6,'2025-07-29 07:22:05','2025-07-29 07:22:05','C');
/*!40000 ALTER TABLE `DemoUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Member`
--

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Member` (
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nickname` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Guest',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwd` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bloodType` enum('A','AB','B','O') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9qv6yhjqm8iafto8qk452gx8h` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Memo`
--

DROP TABLE IF EXISTS `Memo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Memo` (
  `mno` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `memoText` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Memo`
--

LOCK TABLES `Memo` WRITE;
/*!40000 ALTER TABLE `Memo` DISABLE KEYS */;
/*!40000 ALTER TABLE `Memo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `writer` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `writer` (`writer`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`writer`) REFERENCES `User` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,'title01','2025-07-24 04:14:17',NULL,'content....'),(2,'title02','2025-07-24 04:23:47',2,'content....'),(3,'title03','2025-07-24 04:33:11',2,'content....'),(4,'title03','2025-07-24 04:34:19',2,'content....');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reply`
--

DROP TABLE IF EXISTS `Reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reply` (
  `board` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `replyer` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reply` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Reply_board` (`board`),
  CONSTRAINT `fk_Reply_board` FOREIGN KEY (`board`) REFERENCES `Board` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reply`
--

LOCK TABLES `Reply` WRITE;
/*!40000 ALTER TABLE `Reply` DISABLE KEYS */;
INSERT INTO `Reply` VALUES (1,1,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer1','Reply1'),(1,2,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer2','Reply2'),(1,3,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer3','Reply3'),(1,4,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer4','Reply4'),(1,5,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer5','Reply5'),(1,6,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer6','Reply6'),(1,7,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer7','Reply7'),(1,8,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer8','Reply8'),(1,9,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer9','Reply9'),(1,10,'2025-07-29 07:22:06','2025-07-29 07:22:06','Replyer10','Reply10');
/*!40000 ALTER TABLE `Reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TTT`
--

DROP TABLE IF EXISTS `TTT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TTT` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TTT`
--

LOCK TABLES `TTT` WRITE;
/*!40000 ALTER TABLE `TTT` DISABLE KEYS */;
/*!40000 ALTER TABLE `TTT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (2,'Sico22','abc223@gmail.com','010-1234-5622'),(4,'Sico2','abc22@gmail.com','010-1234-5622'),(5,'Sico2','abc223@gmail.com','010-1234-5622');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 16:22:48
