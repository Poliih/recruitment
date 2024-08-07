package com.example.recruitment.repository;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJob(Job job);
}
