# Acxiom CRM – Full-Stack Customer Relationship Management System

A full-stack Customer Relationship Management (CRM) application built with React, Spring Boot, Java, and MySQL. The system helps manage customer relationships, track leads, organize follow-ups, monitor sales opportunities, and maintain activity records through a responsive web interface and REST APIs.

## 🚀 Features

- **Dashboard** – Overview of CRM information and activities.
- **Customer Management** – Organize and maintain customer records.
- **Lead Management** – Track potential customers and sales leads.
- **Follow-Up Management** – Manage follow-up activities.
- **Opportunity Management** – Track potential sales opportunities.
- **Activity Management** – Maintain records of CRM activities.
- **User Management** – Manage CRM user records.
- **Reports** – View CRM summary information.
- **Audit Logs** – Maintain records of system activities.

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- Vite
- HTML5
- CSS3

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven
- REST APIs

### Database
- MySQL

### Development Tools
- Git
- GitHub
- Visual Studio Code

## 📁 Project Structure

```text
Acxiom1CRM-FullStack/
│
├── acxiom-crm-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── acxiom_crm_backend/
│   │   │   │       ├── controller/
│   │   │   │       ├── entity/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       ├── SecurityConfig.java
│   │   │   │       └── AcxiomCrmBackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw.cmd
│
└── acxiom-crm-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── style/
    │   ├── App.jsx
    │   ├── api.js
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## ⚙️ Prerequisites

Install the following before running the application:

- Java Development Kit (JDK)
- Node.js and npm
- MySQL Server
- Git

## 💻 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nathrajeswaree26-netizen/Acxiom1CRM-FullStack.git
cd Acxiom1CRM-FullStack
```

### 2. Configure MySQL

Start MySQL and create the database:

```sql
CREATE DATABASE acxiom_crm;
```

Configure the database connection in:

`acxiom-crm-backend/src/main/resources/application.properties`

### 3. Run the Backend

Open a terminal in the backend directory:

```bash
cd acxiom-crm-backend
```

On Windows CMD, run:

```cmd
mvnw.cmd spring-boot:run
```

### 4. Run the Frontend

Open a second terminal in the project root and run:

```bash
cd acxiom-crm-frontend
npm install
npm run dev
```

## 🔗 Backend API Modules

The backend provides REST endpoints for the following CRM modules:

| Module | Endpoint |
|---|---|
| Customers | `/api/customers` |
| Leads | `/api/leads` |
| Follow-Ups | `/api/follow-ups` |
| Opportunities | `/api/opportunities` |
| Activities | `/api/activities` |
| Users | `/api/users` |
| Reports | `/api/reports` |
| Audit Logs | `/api/audit-logs` |

The API endpoints require the backend and database to be configured and running.

## 🔄 Application Workflow

1. Manage customer information.
2. Record and track sales leads.
3. Schedule and manage follow-ups.
4. Monitor sales opportunities.
5. Record activities and user information.
6. Review reports and audit logs.

## 🔐 Security Note

This project includes a Spring Security configuration for development. Review and configure authentication, authorization, CSRF protection, and database credentials appropriately before deploying the application to production.

## 🎯 Project Objective

The objective of Acxiom CRM is to provide a centralized platform for managing customer information and sales-related activities. The project demonstrates full-stack development using a React frontend, a Java Spring Boot backend, REST API integration, and MySQL database connectivity.

## 👩‍💻 Author

**Rajeswaree Nath**

- GitHub: [@nathrajeswaree26-netizen](https://github.com/nathrajeswaree26-netizen)
- LinkedIn: [Rajeswaree Nath](https://linkedin.com/in/rajeswaree-nath)

## 📄 License

This project is available for learning and demonstration purposes. Add a license file if you intend to distribute it under a specific open-source license.
