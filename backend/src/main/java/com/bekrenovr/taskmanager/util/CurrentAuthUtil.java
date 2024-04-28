package com.bekrenovr.taskmanager.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CurrentAuthUtil {
    public static Authentication get(){
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
