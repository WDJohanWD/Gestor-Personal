package com.personalmanage.personalmanage.services;

import java.util.List;

import com.personalmanage.personalmanage.domain.User;
import com.personalmanage.personalmanage.domain.dto.UserDto;

public interface UserService {
    User createUser(UserDto userDto);
    List<User> getAllUsers();
    Boolean verifyUser(String email, String password);
}
