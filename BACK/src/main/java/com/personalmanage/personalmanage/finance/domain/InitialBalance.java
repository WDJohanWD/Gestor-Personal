package com.personalmanage.personalmanage.finance.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.personalmanage.personalmanage.users.domain.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class InitialBalance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private BigDecimal amount;
    private LocalDate dateSet;
}
