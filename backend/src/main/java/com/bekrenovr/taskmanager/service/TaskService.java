package com.bekrenovr.taskmanager.service;

import com.bekrenovr.taskmanager.model.Task;
import com.bekrenovr.taskmanager.model.TaskRequest;
import com.bekrenovr.taskmanager.model.TaskStatus;
import com.bekrenovr.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    public final TaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Task create(TaskRequest request){
        Task task = requestToTask(request);
        task.setStatus(TaskStatus.SCHEDULED);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    private Task requestToTask(TaskRequest request){
        return Task.builder()
                .name(request.name())
                .description(request.description())
                .build();
    }
}
