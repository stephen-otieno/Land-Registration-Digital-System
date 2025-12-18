package com.nextgen.landregistry.controller;

import com.nextgen.landregistry.entity.User;
import com.nextgen.landregistry.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow React connection
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register Endpoint
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    // NEW: Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> dbUser = userRepository.findByUsername(user.getUsername());

        if (dbUser.isPresent() && dbUser.get().getPassword().equals(user.getPassword())) {
            // Return the user object (Success)
            return ResponseEntity.ok(dbUser.get());
        }
        // Return 401 Unauthorized (Failure)
        return ResponseEntity.status(401).body("Invalid username or password");
    }
}