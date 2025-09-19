package com.Vaibhav.Food_Ordering_App.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Vaibhav.Food_Ordering_App.DTO.ApiResponse;
import com.Vaibhav.Food_Ordering_App.DTO.SignUpRequest;
import com.Vaibhav.Food_Ordering_App.DTO.LoginRequest;
import com.Vaibhav.Food_Ordering_App.Service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signUp(@RequestBody SignUpRequest request) {
        return userService.signUp(request);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
