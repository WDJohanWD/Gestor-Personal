package com.personalmanage.personalmanage.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class InitialBalance {
    @Id @GeneratedValue
    private Long id;

    @OneToOne
    private User user;

    private BigDecimal amount;
    private LocalDate dateSet;
}
