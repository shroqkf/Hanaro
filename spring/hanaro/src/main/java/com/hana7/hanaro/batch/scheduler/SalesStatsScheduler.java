package com.hana7.hanaro.batch.scheduler;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SalesStatsScheduler {

    private final JobLauncher jobLauncher;
    private final Job statJob;

    // 매일 자정(0시 0분 0초)에 실행
    @Scheduled(cron = "0 0 0 * * ?")
    public void runSalesStatsJob() {
        try {
            String saledt = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            JobParameters jobParameters = new JobParametersBuilder()
                    .addString("saledt", saledt)
                    .addLong("time", System.currentTimeMillis())
                    .toJobParameters();
            JobExecution jobExecution = jobLauncher.run(statJob, jobParameters);
            // System.out.println("Job Status: " + jobExecution.getStatus());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
