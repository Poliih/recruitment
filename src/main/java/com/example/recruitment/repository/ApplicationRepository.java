package com.example.recruitment.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.recruitment.model.Application;
import java.util.List;

public interface ApplicationRepository extends CrudRepository<Application, Long> {
    List<Application> findByJobId(Long jobId); // Atualizado para usar o ID do trabalho
}
