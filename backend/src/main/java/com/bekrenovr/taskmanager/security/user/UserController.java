package com.bekrenovr.taskmanager.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.register(request));
    }

    @GetMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestParam("username") String username, @RequestParam String password){
        return ResponseEntity.ok(userService.authenticate(username, password));
    }
}
