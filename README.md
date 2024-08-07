Teste


# Recruitment Application

## Requisitos

- **Java 8+** com **Spring Boot 2.0+**
- **PostgreSQL** ou banco de dados em memória

## Configuração

1. **Banco de Dados**: Configure o banco de dados no arquivo `application.properties`.

2. **Dependências**: Certifique-se de ter as dependências necessárias no seu `pom.xml` ou `build.gradle`.

## Endpoints

### **Vagas**

- **POST** `/api/jobs`: Criar uma nova vaga.
- **GET** `/api/jobs`: Listar todas as vagas.
- **GET** `/api/jobs/{id}`: Obter uma vaga por ID.

### **Candidaturas**

- **POST** `/api/applications`: Candidatar-se a uma vaga.
- **GET** `/api/applications/job/{jobId}`: Listar candidaturas para uma vaga específica.

## Autenticação

- Utilize o login em memória com as credenciais:
    - **Usuário**: `admin`
    - **Senha**: `password`

## Execução

1. Execute a aplicação Spring Boot.
2. Use um cliente REST como Postman para interagir com os endpoints.

## Testes

- Adicione testes unitários e de integração conforme necessário.





Controllers
ApplicationController:

Responsabilidade: Gerenciar as operações relacionadas a candidaturas.
Endpoints:
POST /api/applications: Recebe uma candidatura (Application) e a passa para o serviço para processamento. A candidatura é então salva e retornada.
JobController:

Responsabilidade: Gerenciar as operações relacionadas a vagas de emprego.
Endpoints:
POST /api/jobs: Cria uma nova vaga de emprego (Job) e a salva no banco de dados.
GET /api/jobs: Recupera uma lista de todas as vagas de emprego do banco de dados.
Modelos
Application:

Responsabilidade: Representar uma candidatura para uma vaga.
Campos:
id: Identificador único da candidatura.
job: Referência para a vaga (Job) à qual a candidatura foi feita.
applicantName: Nome do candidato.
applicantEmail: Email do candidato.
Job:

Responsabilidade: Representar uma vaga de emprego.
Campos:
id: Identificador único da vaga.
title: Título da vaga.
description: Descrição da vaga.
Repositórios
ApplicationRepository:

Responsabilidade: Fornecer acesso ao banco de dados para operações relacionadas a candidaturas (Application).
Extende: JpaRepository para operações CRUD padrão.
JobRepository:

Responsabilidade: Fornecer acesso ao banco de dados para operações relacionadas a vagas de emprego (Job).
Extende: JpaRepository para operações CRUD padrão.
Serviços
ApplicationService:

Responsabilidade: Definir operações relacionadas a candidaturas.
Métodos:
applyToJob(Application application): Processa a candidatura e a salva no banco de dados.
ApplicationServiceImpl:

Responsabilidade: Implementar a lógica de negócio para candidaturas.
Métodos:
applyToJob(Application application): Salva a candidatura no banco de dados usando o ApplicationRepository.
JobService:

Responsabilidade: Definir operações relacionadas a vagas de emprego.
Métodos:
createJob(Job job): Cria e salva uma nova vaga.
getAllJobs(): Recupera todas as vagas do banco de dados.
JobServiceImpl:

Responsabilidade: Implementar a lógica de negócio para vagas de emprego.
Métodos:
createJob(Job job): Salva uma nova vaga no banco de dados usando o JobRepository.
getAllJobs(): Recupera todas as vagas do banco de dados.
Configuração do Aplicativo
RecruitmentApplication:
Responsabilidade: Classe principal que inicializa o aplicativo Spring Boot.
Método main: Executa a aplicação Spring Boot.
Esse código configura uma API RESTful básica para um sistema de recrutamento, permitindo a criação e listagem de vagas de emprego e o envio de candidaturas para essas vagas.

SecurityConfig
@Configuration e @EnableWebSecurity:

@Configuration: Indica que esta classe contém configurações de bean do Spring.
@EnableWebSecurity: Habilita a segurança da web no Spring, permitindo a configuração de segurança personalizada.
securityFilterChain:

Responsabilidade: Configura a segurança da aplicação, incluindo políticas de autorização e autenticação.
Configurações:
csrf().disable(): Desativa a proteção contra CSRF (Cross-Site Request Forgery), que pode ser necessário se você estiver desenvolvendo uma API REST.
authorizeRequests: Define regras de autorização:
requestMatchers("/api/**").authenticated(): Exige autenticação para qualquer solicitação que corresponda ao padrão /api/**.
anyRequest().permitAll(): Permite acesso a qualquer outra solicitação sem autenticação.
formLogin: Configura a autenticação baseada em formulários:
loginPage("/login"): Define a página de login personalizada.
permitAll(): Permite o acesso à página de login sem autenticação.
logout: Configura o logout:
permitAll(): Permite a todos os usuários acessarem o endpoint de logout.
passwordEncoder:

Responsabilidade: Define o encoder de senha a ser usado para criptografar senhas.
BCryptPasswordEncoder: Um encoder de senha baseado no algoritmo BCrypt, que é seguro e amplamente utilizado.
UserDetailsServiceImpl
@Service:

Responsabilidade: Indica que esta classe é um componente de serviço do Spring e pode ser injetada em outras partes da aplicação.
UserDetailsService:

Responsabilidade: Interface do Spring Security que fornece um método para carregar detalhes do usuário com base no nome de usuário.
loadUserByUsername:

Responsabilidade: Carrega um usuário do banco de dados com base no nome de usuário fornecido.
Exemplo atual:
Apenas um exemplo básico com um usuário em memória (admin) e uma senha em texto simples (password), que não é recomendado para produção.
Se o nome de usuário não for admin, uma exceção UsernameNotFoundException é lançada.
Nota: Em um cenário real, você deve buscar os detalhes do usuário em um banco de dados e retornar um UserDetails apropriado, contendo informações sobre o usuário e suas permissões. O método new User("admin", "{noop}password", ...) utiliza {noop} para indicar que a senha não é criptografada, o que é útil apenas para fins de teste.

Resumo
Essa configuração faz com que:

Qualquer endpoint que comece com /api/ exija autenticação.
Qualquer outra solicitação será permitida sem autenticação.
Oferece uma página de login e permite o logout.
Usa BCrypt para criptografia de senha.
Configura um UserDetailsService básico que sempre retorna um usuário admin para autenticação.
Essa configuração é uma boa base para começar, mas você deve ajustar e expandir conforme necessário para a segurança real de uma aplicação de produção.
















Controller/ApplicationController

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


Controller/JobController
package com.example.recruitment.controller;

import com.example.recruitment.model.Job;
import com.example.recruitment.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@Validated
public class JobController {
@Autowired
private JobService jobService;

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        return new ResponseEntity<>(jobService.createJob(job), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }
}


model/Application
package com.example.recruitment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Application {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    @ManyToOne
    private Job job;

    private String applicantName;
    private String applicantEmail;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }
}

model/Job
package com.example.recruitment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Job {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Description is mandatory")
    private String description;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

Repository/ApplicationRepository
package com.example.recruitment.repository;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
List<Application> findByJob(Job job);
}

service/JobService
package com.example.recruitment.service;

import com.example.recruitment.model.Job;
import java.util.List;

public interface JobService {
Job createJob(Job job);
List<Job> getAllJobs();
Job getJobById(Long id);
}


service/JobServiceImpl
package com.example.recruitment.service;

import com.example.recruitment.model.Job;
import com.example.recruitment.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {
@Autowired
private JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
    }
}

service/ApplicationService
package com.example.recruitment.service;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;

import java.util.List;

public interface ApplicationService {
Application applyToJob(Application application);
List<Application> getApplicationsByJob(Job job);
}


service/ApplicationServiceImpl
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




exception/GlobalExceptionHandler
package com.example.recruitment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
@ExceptionHandler(Exception.class)
public ResponseEntity<String> handleException(Exception e) {
return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
}
}





RecruitmentApplication
package com.example.recruitment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RecruitmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecruitmentApplication.class, args);
	}

}

config/SecurityConfig
package com.example.recruitment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/**").authenticated()
                                .anyRequest().permitAll()
                )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/login")
                                .permitAll()
                )
                .logout(logout ->
                        logout.permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

config/UserDetailsServiceImpl
package com.example.recruitment.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Aqui você deve buscar o usuário no banco de dados
        // Exemplo com usuário em memória
        if ("admin".equals(username)) {
            return new User("admin", "{noop}password", Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
