package com.personalmanage.personalmanage.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class loginDto {
    private String email;
    private String password;
}
