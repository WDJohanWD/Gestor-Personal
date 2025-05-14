package com.personalmanage.personalmanage.domain;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class MonthlySummary {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    private Integer year;
    private Integer month;

    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
}
