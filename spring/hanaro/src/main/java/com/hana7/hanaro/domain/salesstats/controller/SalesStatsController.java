package com.hana7.hanaro.domain.salesstats.controller;

import com.hana7.hanaro.domain.salesstats.dto.SalesStatsResponseDTO;
import com.hana7.hanaro.domain.salesstats.service.SalesStatsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "매출 통계")
@RestController
@RequestMapping("/salesStats")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class SalesStatsController {

    private final SalesStatsService salesStatsService;

    @Operation(summary = "매출 통계 조회 (관리자용)")
    @GetMapping
    public ResponseEntity<List<SalesStatsResponseDTO>> getSalesStats(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<SalesStatsResponseDTO> statsList = salesStatsService.getStatsByDateRange(startDate, endDate)
                .stream()
                .map(SalesStatsResponseDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(statsList);
    }
}
