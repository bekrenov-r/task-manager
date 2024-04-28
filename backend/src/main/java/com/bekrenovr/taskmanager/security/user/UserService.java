package com.bekrenovr.taskmanager.security.user;

import com.bekrenovr.taskmanager.model.User;
import com.bekrenovr.taskmanager.repository.UserRepository;
import com.bekrenovr.taskmanager.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public void register(RegistrationRequest request) {
        User user = new User(
                null,
                request.firstName(),
                request.lastName(),
                request.username(),
                passwordEncoder.encode(request.password()),
                true
        );
        userRepository.save(user);
    }

    public String authenticate(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(username, password)
        );
        User user = Optional.of(userRepository.findByUsername(authentication.getName()))
                .orElseThrow(() -> new RuntimeException("Person not found"));
        return jwtProvider.generateToken(user);
    }
}
