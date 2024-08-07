
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
  - **Corpo da Requisição:**
    ```json
    {
      "title": "Título da Vaga",
      "description": "Descrição da vaga."
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 1,
      "title": "Título da Vaga",
      "description": "Descrição da vaga."
    }
    ```

- **GET** `/api/jobs`: Listar todas as vagas.
  - **Resposta:**
    ```json
    [
      {
        "id": 1,
        "title": "Software Engineer",
        "description": "Develop and maintain software applications."
      },
      {
        "id": 2,
        "title": "Product Manager",
        "description": "Oversee product development and manage the product lifecycle."
      },
      {
        "id": 3,
        "title": "Data Scientist",
        "description": "Analyze and interpret complex data to help make informed decisions."
      }
    ]
    ```

- **GET** `/api/jobs/{id}`: Obter uma vaga por ID.
  - **Resposta:**
    ```json
    {
      "id": 1,
      "title": "Software Engineer",
      "description": "Develop and maintain software applications."
    }
    ```

### **Candidaturas**

- **POST** `/api/applications`: Candidatar-se a uma vaga.
  - **Corpo da Requisição:**
    ```json
    {
      "jobId": 1,
      "applicantName": "Nome do Candidato",
      "applicantEmail": "email@example.com"
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 1,
      "applicantEmail": "email@example.com",
      "applicantName": "Nome do Candidato",
      "jobId": 1
    }
    ```

- **GET** `/api/applications/job/{jobId}`: Listar candidaturas para uma vaga específica.
  - **Resposta:**
    ```json
    [
      {
        "id": 1,
        "applicantEmail": "alice.smith@example.com",
        "applicantName": "Alice Smith",
        "jobId": 1
      },
      {
        "id": 2,
        "applicantEmail": "bob.johnson@example.com",
        "applicantName": "Bob Johnson",
        "jobId": 1
      }
    ]
    ```

## Autenticação

- Utilize o login em memória com as credenciais:
  - **Usuário**: `admin`
  - **Senha**: `password`

## Execução

1. Execute a aplicação Spring Boot.
2. Use um cliente REST como Postman para interagir com os endpoints.

## Testes

- Adicione testes unitários e de integração conforme necessário.

## Frontend - Angular


### Configuração de Rotas

- **Auth Guard**: `auth.guard.ts` - Protege rotas e redireciona não autenticados para o login.
- **Auth Service**: `auth.service.ts` - Simula login e verificação de autenticação.
- **Job Service**: `job.service.ts` - Manipula requisições para a API de vagas.

### Componente Principal

- **AppComponent**: `app.component.ts` - Contém o layout principal e o menu de navegação.

### Rotas

- **HomeComponent**: Exibe a página inicial.
- **JobListComponent**: Lista todas as vagas disponíveis.
- **JobDetailComponent**: Mostra detalhes de uma vaga específica.
- **JobCreateComponent**: Permite criar novas vagas.
- **LoginComponent**: Tela de login para autenticação de usuários.
