# Smart Clinic Management System – Architecture

## Section 1: Architecture Summary

The Smart Clinic Management System is a Spring Boot application built on a three-tier architecture: presentation, application, and data. It combines two styles of controllers: Spring MVC controllers that render Thymeleaf templates for the Admin and Doctor dashboards, and REST controllers that expose JSON APIs for the other modules, such as appointments, patient dashboard, and patient records. This allows the system to serve both server-rendered web pages and external clients like mobile or single-page apps.

All controllers delegate business logic to a shared service layer, which applies validations and coordinates workflows across entities. The service layer then calls the appropriate repositories. The application uses two databases: MySQL, accessed through Spring Data JPA, stores structured data (patients, doctors, appointments, admins) as JPA entities, while MongoDB, accessed through Spring Data MongoDB, stores flexible prescription records as document models.

## Section 2: Numbered Flow of Data and Control

1. The user accesses the application through a Thymeleaf dashboard (AdminDashboard, DoctorDashboard) or a REST client module (Appointments, PatientDashboard, PatientRecord).
2. The request is routed, based on URL path and HTTP method, to the appropriate Thymeleaf controller or REST controller.
3. The controller validates the input and calls the service layer, where business rules are applied (e.g., checking doctor availability before booking an appointment).
4. The service layer calls the repository layer: JPA repositories for MySQL data or the MongoDB repository for prescriptions.
5. Each repository queries its database: MySQL for relational entities, MongoDB for document-based prescription data.
6. The retrieved data is bound to Java model classes: `@Entity` classes for MySQL and `@Document` classes for MongoDB.
7. The models are returned to the client: in MVC flows they are passed to Thymeleaf templates and rendered as HTML; in REST flows they are serialized (directly or as DTOs) into JSON and sent in the HTTP response.
