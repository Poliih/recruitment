package com.example.recruitment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home() {
        return "index";  // Nome do arquivo HTML na pasta templates
    }

    @GetMapping("/jobs")
    public String viewJobs() {
        // Adicione a lógica para buscar jobs
        return "jobs";  // Nome do arquivo HTML na pasta templates
    }

    @GetMapping("/apply")
    public String apply() {
        return "apply";  // Nome do arquivo HTML na pasta templates
    }
}
