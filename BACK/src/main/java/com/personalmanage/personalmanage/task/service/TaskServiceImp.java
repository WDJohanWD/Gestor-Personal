package com.personalmanage.personalmanage.task.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalmanage.personalmanage.task.domain.Task;
import com.personalmanage.personalmanage.task.domain.TaskDTO;
import com.personalmanage.personalmanage.task.repository.TaskRepository;
import com.personalmanage.personalmanage.users.domain.User;
import com.personalmanage.personalmanage.users.repository.UserRepository;

@Service
public class TaskServiceImp implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Task saveTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());

        User user = userRepository.findByEmail(taskDTO.getUserEmail());
        if (user == null) {
            throw new RuntimeException("User with email " + taskDTO.getUserEmail() + " not found.");
        }
        task.setUser(user);
        return taskRepository.save(task);
    }

    @Override
    public Boolean deleteTask(Task task) {
        if (taskRepository.findById(task.getId()).isPresent()) {
            taskRepository.delete(task);
            return true;
        }
        return false;
    }

    @Override
    public List<Task> taskByUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return taskRepository.findByUser(user);
    }

    @Override
    public Task updatedTask(Task task) {
        if (taskRepository.findById(task.getId()).isPresent()) {
            return taskRepository.save(task);
        }
        return null;
    }

}
