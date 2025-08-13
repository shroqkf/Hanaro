package com.hana7.hanaro.common.config;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.builder.RepositoryItemWriterBuilder;
import org.springframework.batch.item.support.ListItemReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import com.hana7.hanaro.domain.order.entity.OrderItem;
import com.hana7.hanaro.domain.salesstats.entity.SalesStatsItem;
import com.hana7.hanaro.domain.salesstats.entity.SalesStats;
import com.hana7.hanaro.domain.order.repository.OrderRepository;
import com.hana7.hanaro.domain.salesstats.repository.SalesStatsRepository;
import com.hana7.hanaro.domain.salesstats.repository.SalesStatsItemRepository;

import lombok.RequiredArgsConstructor;

 @Configuration @RequiredArgsConstructor
public class OrderBatchConfig {
private final OrderRepository orderRepository;
private final SalesStatsRepository salesStatsRepository;
private final SalesStatsItemRepository salesStatsItemRepository;

 @Bean
public Job statJob(JobRepository jobRepository, Step statStep, Step itemStatStep) {
return new JobBuilder("statJob", jobRepository)
.incrementer(new RunIdIncrementer())
.start(statStep)
.next(itemStatStep)
.build();
}

 @Bean
public Step statStep(JobRepository jobRepository,
PlatformTransactionManager transactionManager) {
return new StepBuilder("statStep", jobRepository)
.<SalesStats, SalesStats>chunk(5, transactionManager)
.reader(statReader(null))
.processor(statProcessor())
.writer(statWriter())
.build();
}

 @Bean
public ItemWriter<SalesStats> statWriter() {
return new RepositoryItemWriterBuilder<SalesStats>()
.repository(salesStatsRepository)
.methodName("save")
.build();
}

 @Bean @StepScope
public ItemProcessor<SalesStats, SalesStats> statProcessor() {
return item -> item;
}

 @Bean @StepScope
public ItemReader<SalesStats> statReader( @Value("#{jobParameters['saledt']}") String saledt) {
    Object[] rawStats = orderRepository.getTodayStat(saledt);
    // System.out.println("bbr - rawStats = " + java.util.Arrays.toString(rawStats));

    String dateString = (String) rawStats[0];
    Long orderCount = (Long) rawStats[1];
    Long salesAmount = (Long) rawStats[2];

    SalesStats todayStats = SalesStats.builder()
            .saledt(dateString)
            .totalOrderCount(orderCount)
            .totalSalesAmount(salesAmount)
            .build();

    // System.out.println("bbr - todayStats = " + todayStats);
    return new ListItemReader<>(List.of(todayStats));
}

 @Bean
public Step itemStatStep(JobRepository jobRepository,
PlatformTransactionManager transactionManager) {
return new StepBuilder("itemStatStep", jobRepository)
.<OrderItem, SalesStatsItem>chunk(5, transactionManager)
.reader(itemStatReader(null))
.processor(itemStatProcessor(null))
.writer(itemStatWriter())
.build();
}

 @Bean @StepScope
public ItemReader<OrderItem> itemStatReader( @Value("#{jobParameters['saledt']}") String saledt) {
List<OrderItem> orderItems = orderRepository.getTodayItemStat(saledt);
// System.out.println("bbr - orderItems = " + orderItems);
return new ListItemReader<>(orderItems);
}

 @Bean @StepScope
public ItemProcessor<OrderItem, SalesStatsItem> itemStatProcessor( @Value("#{jobParameters['saledt']}") String saledt) {
return oi -> SalesStatsItem.builder()
.statsDate(LocalDate.parse(saledt, DateTimeFormatter.ofPattern("yyyyMMdd")))
.item(oi.getItem())
.itemSalesAmount(Long.valueOf(oi.getPrice()))
.soldQuantity(oi.getQuantity())
.build();
}

 @Bean
public ItemWriter<SalesStatsItem> itemStatWriter() {
return new RepositoryItemWriterBuilder<SalesStatsItem>()
.repository(salesStatsItemRepository)
.methodName("save")
.build();
}

}
