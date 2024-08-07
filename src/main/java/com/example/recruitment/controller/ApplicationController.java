package com.example.recruitment.controller;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;
import com.example.recruitment.service.ApplicationService;
import com.example.recruitment.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private JobService jobService;

    @PostMapping
    public Application applyToJob(@RequestBody Application application) {
        return applicationService.applyToJob(application);
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsByJob(@PathVariable Long jobId) {
        Job job = jobService.getJobById(jobId);
        return applicationService.getApplicationsByJob(job);
    }
}
