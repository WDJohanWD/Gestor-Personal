package com.personalmanage.personalmanage.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class PasswordEntry {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    private String site; 
    private String username;
    private String encryptedPassword;
    private String notes;
}
