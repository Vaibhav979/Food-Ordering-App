package com.Vaibhav.Food_Ordering_App.Entity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Colu
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
}