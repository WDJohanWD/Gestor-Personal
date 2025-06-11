package com.personalmanage.personalmanage.users.service;

import com.personalmanage.personalmanage.users.domain.User;
import com.personalmanage.personalmanage.users.domain.dto.UserDto;

public interface UserService {
    User register(UserDto userDto);
    String login(String email, String password);
}
