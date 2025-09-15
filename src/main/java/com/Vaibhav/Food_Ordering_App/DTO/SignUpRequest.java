package com.Vaibhav.Food_Ordering_App.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    private String name;
    private String email;
    private String password;
}