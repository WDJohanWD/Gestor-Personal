package com.personalmanage.personalmanage.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDto {
    
    private String name;
    private String password;
    private String email;
}
