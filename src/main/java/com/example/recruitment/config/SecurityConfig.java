package com.example.recruitment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorizeHttpRequests ->
                        authorizeHttpRequests
                                .requestMatchers("/api/**").authenticated() // Requer autenticação para todas as rotas começando com /api/
                                .anyRequest().permitAll() // Permite acesso a todas as outras rotas sem autenticação
                )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/login") // Página de login personalizada
                                .permitAll() // Permite acesso à página de login sem autenticação
                )
                .logout(logout ->
                        logout
                                .permitAll() // Permite acesso à página de logout sem autenticação
                )
                .csrf(csrf ->
                        csrf.disable() // Desativa a proteção CSRF
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Utiliza BCrypt para codificação de senhas
    }
}
