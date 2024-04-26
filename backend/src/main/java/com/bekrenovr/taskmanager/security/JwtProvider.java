package com.bekrenovr.taskmanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider implements InitializingBean {
    private Key key;

    @Value("${spring.security.jwt.secret}")
    private String secretKey;
    @Value("${spring.security.jwt.expiration}")
    private long expirationTimeMillis;

    @Override
    public void afterPropertiesSet() throws Exception {
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(UserDetails user){
        return generateToken(user.getUsername());
    }

    public String generateToken(Authentication authentication){
        return generateToken(authentication.getName());
    }

    public String generateToken(String subject){
        Date currentDate = new Date(System.currentTimeMillis());
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(currentDate)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeMillis))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token){
        Date expiration = getAllClaims(token).getExpiration();
        Date currentDate = new Date();
        return expiration.after(currentDate);
    }

    public Claims getAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getSubject(String token){
        return getAllClaims(token).getSubject();
    }
}
