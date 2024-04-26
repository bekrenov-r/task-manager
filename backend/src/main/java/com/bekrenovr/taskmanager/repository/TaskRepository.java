package com.bekrenovr.taskmanager.repository;

import com.bekrenovr.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
