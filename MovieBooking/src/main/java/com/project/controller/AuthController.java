package com.project.controller;


import com.project.DTO.Credentials;
import com.project.entities.AppUser;
import com.project.repository.AppUserRepository;
import com.project.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AuthController {


    //requestbody we are gonna get the email and password and based on theat we will return the reponse body
    //with jwt token


    //this authenticationmanager object is readymade object given to check the credentials which we will recieve
    //from the request body
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody Credentials cred) {
        try {
            Authentication auth = new UsernamePasswordAuthenticationToken(cred.getEmail(), cred.getPassword());
            auth = authManager.authenticate(auth);  //this method wants authentication object and return the authentication object
            //this above auth is now our authenticated user

            String token = jwtUtil.createToken(auth);
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }


    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AppUserRepository userDao;

    @PostMapping("/signup")
    public AppUser registerUser(@RequestBody Credentials cred) {

        System.out.println("coming credentials are"+cred.getEmail()+" and"+cred.getPassword());

        String encPassword = passwordEncoder.encode(cred.getPassword());
        AppUser user = new AppUser(0, cred.getEmail(), encPassword, 1, null, "ROLE_USER");
        userDao.save(user);
        return user;
    }
}
