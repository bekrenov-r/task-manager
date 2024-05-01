package com.bekrenovr.taskmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomizedExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<?> handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest webRequest){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(createProblemDetail(ex, HttpStatus.BAD_REQUEST, "Username already exists", null, null, webRequest));
    }
}
