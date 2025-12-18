package com.nextgen.landregistry.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF (Common cause of 401s in POST requests)
                .csrf(csrf -> csrf.disable())

                // 2. Configure CORS (To allow React to talk to Java)
                .cors(withDefaults())

                // 3. Allow H2 Console to display frames
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                // 4. THE CRITICAL PART: Allow ALL API requests
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/h2-console/**").permitAll() // Allow Database
                        .requestMatchers("/api/**").permitAll()        // <--- THIS MUST BE permitAll()
                        .anyRequest().permitAll()                      // Allow everything else for now (Dev Mode)
                );

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow your React Frontend
        config.setAllowedOrigins(List.of("http://localhost:3000"));

        // Allow all standard methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}