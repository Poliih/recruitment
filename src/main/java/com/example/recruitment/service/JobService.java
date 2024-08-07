package com.example.recruitment.service;

import com.example.recruitment.model.Job;
import java.util.List;

public interface JobService {
    Job createJob(Job job);
    List<Job> getAllJobs();
    Job getJobById(Long id);
}