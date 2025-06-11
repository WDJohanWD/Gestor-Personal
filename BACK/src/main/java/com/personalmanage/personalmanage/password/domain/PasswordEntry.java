package com.personalmanage.personalmanage.password.domain;

import com.personalmanage.personalmanage.users.domain.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class PasswordEntry {
    @Id    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String site; 
    private String username;
    private String encryptedPassword;
    private String notes;
}
