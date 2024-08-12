package com.example.recruitment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/jobs")
    public String viewJobs() {

        return "jobs";
    }

    @GetMapping("/apply")
    public String apply() {
        return "apply";
    }
}
