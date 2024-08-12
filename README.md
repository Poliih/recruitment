

# Recruitment System

Este projeto é um sistema de recrutamento que permite a criação, visualização, edição e exclusão de vagas de emprego, bem como a aplicação de candidatos a essas vagas. Ele consiste em um backend desenvolvido em Spring Boot e um frontend em Angular.

## Tecnologias Utilizadas

- **Backend**: Spring Boot, Spring Security - Java
- **Frontend**: Angular
- **Banco de Dados**: postgresql
- **Segurança**: Autenticação e Autorização via Spring Security (com usuários em memória)

## Requisitos de Instalação

Para executar este projeto, você precisará ter as seguintes ferramentas instaladas:

- **Java 17**
- **Maven 3.6+**
- **Node.js 18+** (com npm)
- **Angular CLI 16+**

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Poliih/recruitment
   cd recruitment
   ```

2. Compile e execute o backend:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

O backend estará disponível em `http://localhost:8081`.

### Frontend

1. Navegue para a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

O frontend estará disponível em `http://localhost:4200`.

## Endpoints Disponíveis

### Backend

- **GET** `/api/jobs` - Lista todas as vagas de emprego.
- **GET** `/api/jobs/{id}` - Obtém os detalhes de uma vaga de emprego específica.
- **POST** `/api/jobs` - Cria uma nova vaga de emprego.
- **PUT** `/api/jobs/{id}` - Atualiza os detalhes de uma vaga de emprego existente.
- **DELETE** `/api/jobs/{id}` - Exclui uma vaga de emprego.
- **POST** `/api/jobs/{id}/apply` - Aplica para uma vaga de emprego específica.
- **GET** `/api/jobs/{id}/applications` - Lista todas as aplicações para uma vaga de emprego específica.
- **DELETE** `/api/jobs/applications/{id}` - Exclui uma aplicação específica.

## Modelos

### Job
Representa uma vaga de emprego.

- **id**: Identificador único da vaga (Auto-incremento).
- **title**: Título da vaga (não pode ser nulo).
- **description**: Descrição da vaga (não pode ser nula).

### Application
Representa a aplicação de um candidato para uma vaga.

- **id**: Identificador único da aplicação (Auto-incremento).
- **applicantEmail**: E-mail do candidato (não pode ser nulo).
- **applicantName**: Nome do candidato (não pode ser nulo).
- **job**: Referência para a vaga para a qual o candidato está se aplicando.

### Frontend

- **Home** `/` - Página inicial.
- **Vagas** `/jobs` - Exibe as vagas de emprego disponíveis.
- **Aplicar** `/apply-job/{id}` - Página de aplicação para uma vaga de emprego.
- **Editar Vagas** `/edit-jobs` - Página para criar e editar vagas de emprego.

## Testando a Aplicação

Você pode testar o backend usando ferramentas como Postman ou cURL. Aqui está um exemplo de requisição cURL para listar todas as vagas de emprego:

```bash
curl -X GET http://localhost:8081/api/jobs
```

Para testar o frontend, navegue até `http://localhost:4200` em seu navegador e interaja com a interface de usuário.

## Observações

- **Autenticação**: O sistema utiliza autenticação básica com dois usuários em memória:
  - `user` com senha `user`
  - `admin` com senha `admin`

- **CSRF**: A proteção CSRF está desabilitada para simplificação neste exemplo.

## Contribuindo

Contribuições são bem-vindas! Por favor, abra um pull request ou relate problemas através da seção de issues.



