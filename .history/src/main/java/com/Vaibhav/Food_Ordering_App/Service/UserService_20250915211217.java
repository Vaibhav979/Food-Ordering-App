package com.Vaibhav.Food_Ordering_App.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Vaibhav.Food_Ordering_App.DTO.ApiResponse;
import com.Vaibhav.Food_Ordering_App.DTO.LoginRequest;
import com.Vaibhav.Food_Ordering_App.Entity.User;
import com.Vaibhav.Food_Ordering_App.Repository.UserRepository;
import com.Vaibhav.Food_Ordering_App.DTO.SignUpRequest;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ApiResponse signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse("Email is already in use!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return new ApiResponse("User registered successfully");
    }

    public ApiResponse login(LoginRequest request) {
        var userOpt = userRepository.findByEmail(request.getEmail());
        
        return new ApiResponse("Login successful");
    }
}
