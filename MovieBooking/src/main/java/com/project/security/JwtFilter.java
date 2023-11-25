package com.project.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
        Authentication auth = null;
        if (validHeader) {
            String token = authHeader.replace("Bearer", "").trim();
            // validate that jwt token and create Authentication object
            System.out.println("checking token"+token);
            auth = jwtUtil.validateToken(token);
        }

        //  attach auth/principal to current security context
        if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null)
            SecurityContextHolder.getContext().setAuthentication(auth);
//		If an Authentication object is successfully created and the current security context (SecurityContextHolder)
//		does not already have an authentication (principal), it sets the authentication object in the
//		security context. This effectively logs the user in and establishes their security context for the
//		duration of the request.

        // invoke next filter in the chain
        filterChain.doFilter(request, response);

        // POST-PROCESSING (nothing to do here)
    }
}
