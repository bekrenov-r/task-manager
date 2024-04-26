package com.bekrenovr.taskmanager.security.user;

public record RegistrationRequest(
        String username,
        String password
) { }
