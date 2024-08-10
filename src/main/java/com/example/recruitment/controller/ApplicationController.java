package com.example.recruitment.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;
import com.example.recruitment.repository.ApplicationRepository;
import com.example.recruitment.repository.JobRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class ApplicationController {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public ApplicationController(JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    // Endpoint to apply for a job
    @PostMapping("/{id}/apply")
    public ResponseEntity<Application> applyForJob(@PathVariable("id") Long id,
                                                   @Valid @RequestBody Application application) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        if (jobOptional.isPresent()) {
            Job job = jobOptional.get();
            application.setJob(job); // Set the job object in the application
            Application savedApplication = applicationRepository.save(application);
            return ResponseEntity.ok(savedApplication);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete an application
    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        Optional<Application> applicationOptional = applicationRepository.findById(id);
        if (applicationOptional.isPresent()) {
            applicationRepository.delete(applicationOptional.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to get applications for a specific job
    @GetMapping("/{id}/applications")
    public ResponseEntity<List<Application>> getApplicationsForJob(@PathVariable("id") Long id) {
        List<Application> applications = applicationRepository.findByJobId(id);
        if (!applications.isEmpty()) {
            return ResponseEntity.ok(applications);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
