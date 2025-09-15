package com.Vaibhav.Food_Ordering_App.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private final UserSerice userService;

    @PostMapping("/signup")
    public ApiResponse signUp(@RequestBody SignUpRequest request){
        return userService.signUp(request);
    }
}
