package com.personalmanage.personalmanage.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.personalmanage.personalmanage.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);
}
