package com.example.recruitment.service;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;

import java.util.List;

public interface ApplicationService {
    Application applyToJob(Application application);
    List<Application> getApplicationsByJob(Job job);
}
