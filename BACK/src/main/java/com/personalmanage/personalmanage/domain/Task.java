package com.personalmanage.personalmanage.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Task {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
}

