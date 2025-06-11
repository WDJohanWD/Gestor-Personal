package com.personalmanage.personalmanage.finance.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.personalmanage.personalmanage.users.domain.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String type; 
    private String category;
    private BigDecimal amount;
    private String description;
    private LocalDate date;
}