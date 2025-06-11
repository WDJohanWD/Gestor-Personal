package com.personalmanage.personalmanage.task.service;

import java.util.List;
import com.personalmanage.personalmanage.task.domain.Task;
import com.personalmanage.personalmanage.task.domain.TaskDTO;

public interface TaskService {
    Task saveTask(TaskDTO task);
    Boolean deleteTask(Task task);
    List<Task> taskByUser(Long id);
    Task updatedTask(Task task);
}
