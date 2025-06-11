package com.personalmanage.personalmanage.finance.domain;

import java.math.BigDecimal;
import com.personalmanage.personalmanage.users.domain.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "monthly_summary")
public class MonthlySummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "\"month\"", nullable = false)
    private Integer month;

    @Column(name = "\"year\"", nullable = false)
    private Integer year;

    @Column(name = "total_income", precision = 19, scale = 2)
    private BigDecimal totalIncome;

    @Column(name = "total_expense", precision = 19, scale = 2)
    private BigDecimal totalExpense;
}