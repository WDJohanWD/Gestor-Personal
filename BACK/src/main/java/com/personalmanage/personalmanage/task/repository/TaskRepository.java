package com.personalmanage.personalmanage.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.personalmanage.personalmanage.task.domain.Task;
import java.util.List;
import java.util.Optional;

import com.personalmanage.personalmanage.users.domain.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findById(Long id);
    List<Task> findByUser(User user);
}
