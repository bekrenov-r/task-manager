package com.bekrenovr.taskmanager.service;

import com.bekrenovr.taskmanager.model.Task;
import com.bekrenovr.taskmanager.model.TaskRequest;
import com.bekrenovr.taskmanager.model.TaskStatus;
import com.bekrenovr.taskmanager.repository.TaskRepository;
import com.bekrenovr.taskmanager.util.CurrentAuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    public final TaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAllByOwnerUsername(CurrentAuthUtil.get().getName());
    }

    public Task create(TaskRequest request){
        Task task = new Task(
                null,
                request.name(),
                request.description(),
                TaskStatus.SCHEDULED,
                LocalDateTime.now(),
                CurrentAuthUtil.get().getName()
        );
        return taskRepository.save(task);
    }

    public Task update(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        if(!task.getOwnerUsername().equals(CurrentAuthUtil.get().getName()))
            throw new RuntimeException("You are not owner of this entity");
        task.setName(request.name());
        task.setDescription(request.description());
        return taskRepository.save(task);
    }

    public void finish(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        if(!task.getOwnerUsername().equals(CurrentAuthUtil.get().getName()))
            throw new RuntimeException("You are not owner of this entity");
        task.setStatus(TaskStatus.DONE);
        taskRepository.save(task);
    }


    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        if(!task.getOwnerUsername().equals(CurrentAuthUtil.get().getName()))
            throw new RuntimeException("You are not owner of this entity");
        taskRepository.delete(task);
    }
}
