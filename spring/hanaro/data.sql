-- MySQL dump 10.13  Distrib 8.0.42, for macos15.2 (arm64)
--
-- Host: 127.0.0.1    Database: hanarodb
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `BATCH_JOB_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  KEY `JOB_INST_EXEC_FK` (`JOB_INSTANCE_ID`),
  CONSTRAINT `JOB_INST_EXEC_FK` FOREIGN KEY (`JOB_INSTANCE_ID`) REFERENCES `BATCH_JOB_INSTANCE` (`JOB_INSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION`
--

LOCK TABLES `BATCH_JOB_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION` VALUES (1,2,1,'2025-08-12 15:32:41.759574','2025-08-12 15:32:41.786263','2025-08-12 15:32:41.878827','FAILED','FAILED','org.springframework.beans.factory.BeanCreationException: Error creating bean with name \'scopedTarget.statReader\' defined in class path resource [com/hana7/hanaro/common/config/OrderBatchConfig.class]: Failed to instantiate [org.springframework.batch.item.ItemReader]: Factory method \'statReader\' threw exception with message: JDBC exception executing SQL [select date_format(o1_0.createdAt,\'%Y%m%d\'),count(o1_0.id),sum((oi1_0.price*oi1_0.quantity)) from Orders o1_0 join OrderItem oi1_0 on o1_0.id=oi1_0.orderId where date_format(o1_0.createdAt,\'%Y%m%d\')=?] [In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column \'hanarodb.o1_0.createdAt\'; this is incompatible with sql_mode=only_full_group_by] [n/a]; SQL [n/a]\n	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:657)\n	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:645)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1375)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1205)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:569)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529)\n	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$1(AbstractBeanFactory.java:378)\n	at org.springframework.batch.core.scope.StepScope.get(StepScope.java:112)\n	at org.springframework.beans.factory.support.AbstractBeanFactory.doG... [truncated]
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_CONTEXT` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_CTX_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_JOB_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_CONTEXT` VALUES (1,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(2,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(3,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(4,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(5,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(6,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(7,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(8,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(9,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(10,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(11,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(12,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAANYmF0Y2gudmVyc2lvbnQABTUuMi4yeA==',NULL),(13,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXR... [truncated]
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_PARAMS`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_PARAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_PARAMS` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `PARAMETER_NAME` varchar(100) NOT NULL,
  `PARAMETER_TYPE` varchar(100) NOT NULL,
  `PARAMETER_VALUE` varchar(2500) DEFAULT NULL,
  `IDENTIFYING` char(1) NOT NULL,
  KEY `JOB_EXEC_PARAMS_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_PARAMS_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_PARAMS`
--

LOCK TABLES `BATCH_JOB_EXECUTION_PARAMS` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_PARAMS` VALUES (1,'run.id','java.lang.Long','1','Y'),(2,'run.id','java.lang.Long','2','Y'),(3,'run.id','java.lang.Long','3','Y'),(4,'run.id','java.lang.Long','4','Y'),(5,'run.id','java.lang.Long','5','Y'),(6,'run.id','java.lang.Long','6','Y'),(7,'run.id','java.lang.Long','7','Y'),(8,'run.id','java.lang.Long','8','Y'),(9,'run.id','java.lang.Long','9','Y'),(10,'run.id','java.lang.Long','10','Y'),(11,'run.id','java.lang.Long','11','Y'),(12,'run.id','java.lang.Long','12','Y'),(13,'run.id','java.lang.Long','13','Y'),(14,'run.id','java.lang.Long','14','Y'),(15,'run.id','java.lang.Long','15','Y'),(16,'run.id','java.lang.Long','16','Y'),(17,'run.id','java.lang.Long','17','Y'),(18,'run.id','java.lang.Long','18','Y'),(19,'run.id','java.lang.Long','19','Y'),(20,'run.id','java.lang.Long','20','Y'),(21,'run.id','java.lang.Long','21','Y'),(22,'run.id','java.lang.Long','22','Y'),(23,'run.id','java.lang.Long','23','Y'),(24,'run.id','java.lang.Long','24','Y'),(25,'run.id','java.lang.Long','25','Y'),(26,'run.id','java.lang.Long','26','Y'),(27,'run.id','java.lang.Long','27','Y'),(28,'run.id','java.lang.Long','28','Y'),(29,'run.id','java.lang.Long','29','Y'),(30,'run.id','java.lang.Long','30','Y'),(31,'run.id','java.lang.Long','31','Y'),(32,'run.id','java.lang.Long','32','Y'),(33,'run.id','java.lang.Long','33','Y'),(34,'run.id','java.lang.Long','34','Y'),(35,'run.id','java.lang.Long','35','Y'),(36,'run.id','java.lang.Long','36','Y'),(37,'run.id','java.lang.Long','37','Y'),(38,'run.id','java.lang.Long','38','Y'),(39,'run.id','java.lang.Long','39','Y'),(40,'run.id','java.lang.Long','40','Y'),(41,'run.id','java.lang.Long','41','Y'),(42,'run.id','java.lang.Long','42','Y'),(43,'run.id','java.lang.Long','43','Y'),(44,'run.id','java.lang.Long','44','Y'),(45,'run.id','java.lang.Long','45','Y'),(46,'run.id','java.lang.Long','46','Y'),(47,'run.id','java.lang.Long','47','Y'),(48,'run.id','java.lang.Long','48','Y'),(49,'run.id','java.lang.Long','49','Y'),(50,'run.i... [truncated]
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_JOB_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` ENABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_SEQ` VALUES (95,'0');
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_INSTANCE`
--

DROP TABLE IF EXISTS `BATCH_JOB_INSTANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_INSTANCE` (
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_NAME` varchar(100) NOT NULL,
  `JOB_KEY` varchar(32) NOT NULL,
  PRIMARY KEY (`JOB_INSTANCE_ID`),
  UNIQUE KEY `JOB_INST_UN` (`JOB_NAME`,`JOB_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_INSTANCE`
--

LOCK TABLES `BATCH_JOB_INSTANCE` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_INSTANCE` VALUES (1,0,'statJob','947cce338b790a4bb6cf8425e98bcf94'),(2,0,'statJob','873184ac21ff8558bbd5b28473daefc6'),(3,0,'statJob','effe242e395340f2e57819baa23a9d15'),(4,0,'statJob','5477f63cea9fea164bc95c20c7e13973'),(5,0,'statJob','8861b2531b2254c9c8ff617d695b6f5e'),(6,0,'statJob','b9fc39c8b96323ee0a40cff8aa90ab12'),(7,0,'statJob','b3a17a269e3896a20099576821120151'),(8,0,'statJob','d6321fea5d91729f784f2267690480d8'),(9,0,'statJob','29a856a5acdba91e1e3d0b5e11794b12'),(10,0,'statJob','3c08ce1fdc6dd592f1b6670eec44269f'),(11,0,'statJob','ae2f85e585cb33415849906ce3c09001'),(12,0,'statJob','52ade253569e8abd58c848d1e5a38275'),(13,0,'statJob','e79d730c06d7430dc2ff6d2815718cdb'),(14,0,'statJob','be853a8cf06509b73ea5071fd453b0c0'),(15,0,'statJob','9e1f5a1517f4bb9a26c0bf6c45eae6d0'),(16,0,'statJob','ebbe5d3e2e377c519954afc48abcda6d'),(17,0,'statJob','0a7ca319b518b85ce0e62b30be80bc52'),(18,0,'statJob','1e82875f665631a91add7fc1d8fd5bd1'),(19,0,'statJob','3de2ec384561880a4c0566d1bd3d6c38'),(20,0,'statJob','47ce1c6cc2e06afa8f38062820d11729'),(21,0,'statJob','a23d85e93b9d540132b0fa46dedae72c'),(22,0,'statJob','37af83ab35e7a9422f8a2fe4993b1e1e'),(23,0,'statJob','22a5c785cecaa2fd2cc302d44afdb562'),(24,0,'statJob','365df012dded5a183e33cbdc56b7f488'),(25,0,'statJob','48b2111630bbd90d43836b267c9fdd7a'),(26,0,'statJob','9d30d8195cc85005c07cd297c7311dfc'),(27,0,'statJob','8e108062a13ae00b0e78f5d96a3eee08'),(28,0,'statJob','7ae89e49d6cee7190f17f65bf4c139e0'),(29,0,'statJob','babf3e2c1d221379c082899b1fa4654a'),(30,0,'statJob','783a01fdbe6e5dd15dbc553592e2f3d0'),(31,0,'statJob','0a4b47a8fc327d8b5b82c9cf9363f506'),(32,0,'statJob','9adc84edffd129c750232b7e6cd4fe47'),(33,0,'statJob','ddf263d1451eb5b68d974b827af89d9d'),(34,0,'statJob','d570feebcbb14f53407eb323da32fe50'),(35,0,'statJob','544f4f074e38e273466951badeb6d424'),(36,0,'statJob','c03cec16feae59da06937baf5cfbdb94'),(37,0,'statJob','65c80f676763f8968ce4fbc5d0604c72'),(38,0,'statJob','7f8afdfb56f7f368d3666e06b756... [truncated]
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_SEQ`
--

LOCK TABLES `BATCH_JOB_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` ENABLE KEYS */;
INSERT INTO `BATCH_JOB_SEQ` VALUES (95,'0');
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint NOT NULL,
  `STEP_NAME` varchar(100) NOT NULL,
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `COMMIT_COUNT` bigint DEFAULT NULL,
  `READ_COUNT` bigint DEFAULT NULL,
  `FILTER_COUNT` bigint DEFAULT NULL,
  `WRITE_COUNT` bigint DEFAULT NULL,
  `READ_SKIP_COUNT` bigint DEFAULT NULL,
  `WRITE_SKIP_COUNT` bigint DEFAULT NULL,
  `PROCESS_SKIP_COUNT` bigint DEFAULT NULL,
  `ROLLBACK_COUNT` bigint DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  KEY `JOB_EXEC_STEP_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_STEP_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION`
--

LOCK TABLES `BATCH_STEP_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION` VALUES (1,2,'statStep',1,'2025-08-12 15:32:41.796712','2025-08-12 15:32:41.804903','2025-08-12 15:32:41.871959','FAILED',0,0,0,0,0,0,0,1,'FAILED','org.springframework.beans.factory.BeanCreationException: Error creating bean with name \'scopedTarget.statReader\' defined in class path resource [com/hana7/hanaro/common/config/OrderBatchConfig.class]: Failed to instantiate [org.springframework.batch.item.ItemReader]: Factory method \'statReader\' threw exception with message: JDBC exception executing SQL [select date_format(o1_0.createdAt,\'%Y%m%d\'),count(o1_0.id),sum((oi1_0.price*oi1_0.quantity)) from Orders o1_0 join OrderItem oi1_0 on o1_0.id=oi1_0.orderId where date_format(o1_0.createdAt,\'%Y%m%d\')=?] [In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column \'hanarodb.o1_0.createdAt\'; this is incompatible with sql_mode=only_full_group_by] [n/a]; SQL [n/a]\n	at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:657)\n	at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:645)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1375)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1205)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:569)\n	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529)\n	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$1(AbstractBeanFactory.java:378)\n	at org.springframework.batch.core.scope.StepScope.get(StepScope.java:112)\n	at org.springframework.beans.factory.sup... [truncated]
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_CONTEXT` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  CONSTRAINT `STEP_EXEC_CTX_FK` FOREIGN KEY (`STEP_EXECUTION_ID`) REFERENCES `BATCH_STEP_EXECUTION` (`STEP_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_STEP_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_CONTEXT` VALUES (1,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAANYmF0Y2gudmVyc2lvbnQABTUuMi4ydAAOYmF0Y2guc3RlcFR5cGV0ADdvcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC50YXNrbGV0LlRhc2tsZXRTdGVweA==',NULL),(2,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZWntZWRUYXNrbGV0dAANYmF0Y2gudmVyc2lvbnQABTUuMi4ydAAOYmF0Y2guc3RlcFR5cGV0ADdvcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC50YXNrbGV0LlRhc2tsZXRTdGVweA==',NULL),(3,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAANYmF0Y2gudmVyc2lvbnQABTUuMi4ydAAOYmF0Y2guc3RlcFR5cGV0ADdvcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC50YXNrbGV0LlRhc2tsZXRTdGVweA==',NULL),(4,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAANYmF0Y2gudmVyc2lvbnQABTUuMi4ydAAOYmF0Y2guc3RlcFR5cGV0ADdvcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC50YXNrbGV0LlRhc2tsZXRTdGVweA==',NULL),(5,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAARYmF0Y2gudGFza2xldFR5cGV0AD1vcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC5pdGVtLkNodW5rT3JpZW50ZWRUYXNrbGV0dAANYmF0Y2gudmVyc2lvbnQABTUuMi4ydAAOYmF0Y2guc3RlcFR5cGV0ADdvcmcuc3ByaW5nZnJhbWV3b3JrLmJhdGNoLmNvcmUuc3RlcC50YXNrbGV0LlRhc2tsZXRTdGVweA==',NULL),(6,'rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAA... [truncated]
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_STEP_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` ENABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_SEQ` VALUES (95,'0');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKi56gs8aixcubdbrel710ak86k` (`userId`),
  CONSTRAINT `fk_Cart_User` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,'2025-08-12 08:40:49','2025-08-12 08:40:49',2),(3,'2025-08-12 09:18:37','2025-08-12 09:18:37',4);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartItem`
--

DROP TABLE IF EXISTS `cartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartItem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity` int NOT NULL,
  `cartId` bigint unsigned DEFAULT NULL,
  `productId` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_CartItem_Cart` (`cartId`),
  KEY `fk_CartItem_Item` (`productId`),
  CONSTRAINT `fk_CartItem_Cart` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`),
  CONSTRAINT `fk_CartItem_Item` FOREIGN KEY (`productId`) REFERENCES `item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItem`
--

LOCK TABLES `cartItem` WRITE;
/*!40000 ALTER TABLE `cartItem` DISABLE KEYS */;
INSERT INTO `cartItem` VALUES (1,'2025-08-12 08:40:51','2025-08-12 08:40:51',1,1,1),(2,'2025-08-12 08:40:51','2025-08-12 08:40:51',2,1,2),(3,'2025-08-12 09:24:04','2025-08-12 09:24:04',1,1,3);
/*!40000 ALTER TABLE `cartItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(30) NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'2025-08-12 08:40:41','2025-08-12 08:40:41','무지 반팔티',12000,100),(2,'2025-08-12 08:40:41','2025-08-12 08:40:41','데님 팬츠',20000,50),(3,'2025-08-12 08:40:41','2025-08-12 08:40:41','캔버스 스니커즈',30000,30);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemImage`
--

DROP TABLE IF EXISTS `itemImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemImage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `orgName` varchar(255) NOT NULL,
  `saveDir` varchar(255) NOT NULL,
  `saveName` varchar(255) NOT NULL,
  `itemId` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk5q3e8kacigs8y77xc4nwjas0` (`itemId`),
  CONSTRAINT `FKk5q3e8kacigs8y77xc4nwjas0` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemImage`
--

LOCK TABLES `itemImage` WRITE;
/*!40000 ALTER TABLE `itemImage` DISABLE KEYS */;
/*!40000 ALTER TABLE `itemImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderItem`
--

DROP TABLE IF EXISTS `orderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderItem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  `productId` bigint unsigned DEFAULT NULL,
  `orderId` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_OrderItem_Item` (`productId`),
  KEY `fk_OrderItem_Order` (`orderId`),
  CONSTRAINT `fk_OrderItem_Item` FOREIGN KEY (`productId`) REFERENCES `item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_OrderItem_Order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItem`
--

LOCK TABLES `orderItem` WRITE;
/*!40000 ALTER TABLE `orderItem` DISABLE KEYS */;
INSERT INTO `orderItem` VALUES (1,10000,3,1,1),(2,20000,2,2,2),(3,30000,1,3,1),(4,12000,1,1,3),(5,20000,2,2,3);
/*!40000 ALTER TABLE `orderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('COMPLETED','PAID','PREPARING','PROCESSING') DEFAULT NULL,
  `totalPrice` int NOT NULL,
  `userId` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Order_User` (`userId`),
  CONSTRAINT `fk_Order_User` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-08-12 08:40:43','2025-08-12 08:40:43','PAID',24000,2),(2,'2025-08-12 08:40:43','2025-08-12 08:40:43','COMPLETED',100000,2),(3,'2025-08-12 09:18:50','2025-08-12 09:18:50','PAID',52000,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salesStat`
--

DROP TABLE IF EXISTS `salesStat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salesStat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `saledt` varchar(255) NOT NULL,
  `totalOrderCount` bigint NOT NULL,
  `totalSalesAmount` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKqngr1gh83kcv3tvnqvxwuiqcl` (`saledt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salesStat`
--

LOCK TABLES `salesStat` WRITE;
/*!40000 ALTER TABLE `salesStat` DISABLE KEYS */;
/*!40000 ALTER TABLE `salesStat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salesStatItem`
--

DROP TABLE IF EXISTS `salesStatItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salesStatItem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemSalesAmount` bigint NOT NULL,
  `soldQuantity` int NOT NULL,
  `statsDate` date NOT NULL,
  `itemId` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7p1xgyt73icyqp9yresuuokyg` (`itemId`),
  CONSTRAINT `FK7p1xgyt73icyqp9yresuuokyg` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salesStatItem`
--

LOCK TABLES `salesStatItem` WRITE;
/*!40000 ALTER TABLE `salesStatItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `salesStatItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(255) NOT NULL,
  `name` varchar(31) NOT NULL DEFAULT 'name',
  `password` varchar(255) NOT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') DEFAULT 'ROLE_USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2025-08-12 08:40:39','2025-08-12 08:40:39','admin@gmail.com','관리자','$2a$10$2fBR8j2ogTzDIA268yLalO2wj5LPewdOdZkpEHDvKGzKUCXGSBfT.','ROLE_ADMIN'),(2,'2025-08-12 08:40:39','2025-08-12 08:40:39','user@gmail.com','사용자','$2a$10$txqsT7NtPezqohSE95M9wuh/7p7jRmDmZJNgLIOcnupT.Nh.5ru/O','ROLE_USER'),(4,'2025-08-12 09:18:37','2025-08-12 09:18:37','test@gmail.com','string','$2a$10$6s7uSIv3VSPnsvdl.EEnK.D6DURypupz7dryx/HX01jLOPE7P5WQ.','ROLE_USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hanarodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-12 18:52:14
