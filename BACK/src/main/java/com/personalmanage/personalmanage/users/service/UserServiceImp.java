package com.personalmanage.personalmanage.users.service;

import com.personalmanage.personalmanage.users.domain.User;
import com.personalmanage.personalmanage.users.domain.dto.UserDto;
import com.personalmanage.personalmanage.users.repository.UserRepository;
import com.personalmanage.personalmanage.config.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;



    public User register(UserDto dto) {
        if (userRepository.findByEmail(dto.getEmail()) != null) {
            throw new RuntimeException("El correo ya está registrado");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return userRepository.save(user);
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return jwtService.generateToken(user.getEmail());
    }
}
