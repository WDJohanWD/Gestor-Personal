package com.personalmanage.personalmanage.users.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.personalmanage.personalmanage.users.domain.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);
}
