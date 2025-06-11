package com.personalmanage.personalmanage.task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalmanage.personalmanage.task.domain.Task;
import com.personalmanage.personalmanage.task.domain.TaskDTO;
import com.personalmanage.personalmanage.task.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskDTO taskDTO){
        return ResponseEntity.ok(taskService.saveTask(taskDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,@RequestBody Task task){
        return ResponseEntity.ok(taskService.updatedTask(id, task));
    }

    @PatchMapping("/complete/{id}")
    public ResponseEntity<?> completeTask(@PathVariable Long id){
        return ResponseEntity.ok(taskService.completeTask(id));
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
