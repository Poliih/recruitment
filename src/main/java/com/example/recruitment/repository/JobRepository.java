package com.example.recruitment.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.recruitment.model.Job;
import java.util.List;

public interface JobRepository extends CrudRepository<Job, Long> {
    List<Job> findByTitle(String title);
}
