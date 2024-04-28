package com.bekrenovr.taskmanager.security.user;

public record RegistrationRequest(
        String firstName,
        String lastName,
        String username,
        String password
) { }
