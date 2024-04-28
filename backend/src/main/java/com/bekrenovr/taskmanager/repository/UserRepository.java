package com.bekrenovr.taskmanager.repository;

import com.bekrenovr.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserDetailsService {
    User findByUsername(String username);

    @Override
    default UserDetails loadUserByUsername(String username){
        return findByUsername(username);
    };
}
