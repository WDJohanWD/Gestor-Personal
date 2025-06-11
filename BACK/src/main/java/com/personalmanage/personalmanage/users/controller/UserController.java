package com.personalmanage.personalmanage.users.controller;


import org.springframework.web.bind.annotation.RestController;

import com.personalmanage.personalmanage.users.domain.User;
import com.personalmanage.personalmanage.users.domain.dto.UserDto;
import com.personalmanage.personalmanage.users.domain.dto.loginDto;
import com.personalmanage.personalmanage.users.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class UserController {

    @Autowired
    private UserService userService;

   @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    } 

    @PostMapping("/register")
    public ResponseEntity <?> getMethodName(@RequestBody UserDto userDto) {
        User user = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity <?> login (@RequestBody loginDto loginDto) {
        if (userService.verifyUser(loginDto.getEmail(), loginDto.getPassword())){
            return ResponseEntity.ok("Login successful");
        };
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Invalid email or password");   
    }   
}
