package com.personalmanage.personalmanage.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
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
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    private String type; 
    private String category;
    private BigDecimal amount;
    private String description;
    private LocalDate date;
}