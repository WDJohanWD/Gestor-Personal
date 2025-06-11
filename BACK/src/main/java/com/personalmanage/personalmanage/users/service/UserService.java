package com.personalmanage.personalmanage.users.service;

import java.util.List;

import com.personalmanage.personalmanage.users.domain.User;
import com.personalmanage.personalmanage.users.domain.dto.UserDto;

public interface UserService {
    User createUser(UserDto userDto);
    List<User> getAllUsers();
    Boolean verifyUser(String email, String password);
}
