package com.personalmanage.personalmanage.task.domain;

import java.time.LocalDate;

import com.personalmanage.personalmanage.users.domain.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
}

