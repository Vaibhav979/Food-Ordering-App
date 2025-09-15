package com.Vaibhav.Food_Ordering_App.Entity;
import jakarta.persistence.*;
import lombok.*;


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
}