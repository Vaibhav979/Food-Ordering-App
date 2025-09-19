package com.Vaibhav.Food_Ordering_App.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<ApiResponse> signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST) // 400
                    .body(new ApiResponse("Email is already in use! Login Instead!"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED) // 201
                .body(new ApiResponse("User registered successfully"));
    }

    public ResponseEntity<ApiResponse> login(LoginRequest request) {
        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST) // 400
                    .body(new ApiResponse("Invalid email or password"));
        }
        return new ResponseEntity<ApiResponse>("Login successful");
    }
}
