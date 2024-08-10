package com.example.recruitment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.recruitment.model.Application;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobId(Long jobId);
}
