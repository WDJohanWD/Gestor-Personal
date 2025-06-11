package com.personalmanage.personalmanage.task.domain;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String userEmail;
}
