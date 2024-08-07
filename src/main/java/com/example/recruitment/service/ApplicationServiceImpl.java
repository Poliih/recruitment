package com.example.recruitment.service;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;
import com.example.recruitment.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Application applyToJob(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getApplicationsByJob(Job job) {
        return applicationRepository.findByJob(job);
    }
}
