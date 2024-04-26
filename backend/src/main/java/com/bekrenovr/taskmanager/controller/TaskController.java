package com.bekrenovr.taskmanager.controller;

import com.bekrenovr.taskmanager.model.TaskRequest;
import com.bekrenovr.taskmanager.service.TaskService;
import com.bekrenovr.taskmanager.model.Task;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAll(){
        return ResponseEntity.ok(taskService.getAll());
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody TaskRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.create(request));
    }
}
