package com.Vaibhav.Food_Ordering_App.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Vaibhav.Food_Ordering_App.DTO.ApiResponse;
import com.Vaibhav.Food_Ordering_App.DTO.SignUpRequest;
import com.Vaibhav.Food_Ordering_App.Service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ApiResponse signUp(@RequestBody SignUpRequest request) {
        return userService.signUp(request);
    }

    
}
