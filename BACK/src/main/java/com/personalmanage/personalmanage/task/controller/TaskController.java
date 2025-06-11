package com.personalmanage.personalmanage.task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalmanage.personalmanage.task.domain.Task;
import com.personalmanage.personalmanage.task.domain.TaskDTO;
import com.personalmanage.personalmanage.task.service.TaskService;
import com.personalmanage.personalmanage.users.domain.User;

@RestController
@RequestMapping("/task")
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskDTO taskDTO){
        return ResponseEntity.ok(taskService.saveTask(taskDTO));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTask(@RequestBody Task task){
        return ResponseEntity.ok(taskService.updatedTask(task));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteTask(@RequestBody Task task){
        return ResponseEntity.ok(taskService.deleteTask(task));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getTaskByUser(@PathVariable Long id){
        return ResponseEntity.ok(taskService.taskByUser(id));
    }
}
