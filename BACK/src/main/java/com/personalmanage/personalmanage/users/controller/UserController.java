package com.personalmanage.personalmanage.users.controller;

import com.personalmanage.personalmanage.users.domain.User;
import com.personalmanage.personalmanage.users.domain.dto.UserDto;
import com.personalmanage.personalmanage.users.domain.dto.loginDto;
import com.personalmanage.personalmanage.users.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/auth")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto dto) {
        User user = userService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginDto loginDto) {
        String token = userService.login(loginDto.getEmail(), loginDto.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
