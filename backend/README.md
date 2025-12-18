# Land Registration Digital System - Backend API

## 📋 Overview
The **Land Registration Digital System Backend** is a robust RESTful API built with **Java Spring Boot**. It serves as the core engine for digitizing land records, specifically designed to handle the complexities of land administration in Kenya (e.g., Kisii Land Registry).

It manages the lifecycle of **Land Parcels**, **Title Deeds**, **Proprietors (Owners)**, and **Encumbrances** (Charges, Caveats), providing a secure and scalable foundation for the frontend application.

## 🚀 Tech Stack
* **Language:** Java 17+
* **Framework:** Spring Boot 3.x
* **Database:** H2 Database
* **Persistence:** Spring Data JPA (Hibernate)
* **Build Tool:** Maven
* **API Testing:** Postman

## ⚙️ Key Features
* **Land Management:** Register, update, and archive land parcels.
* **Ownership Tracking:** Support for individual, corporate, and joint ownership (Tenancy in Common).
* **Title Issuance:** Digital management of Title Deeds (Freehold/Leasehold).
* **Encumbrances:** Track mortgages (Charges), caveats, and other restrictions.
* **Search:** Quick lookup by Title Number (e.g., `KISII/BLOCK/450`).

---

## 🛠️ Getting Started

### Prerequisites
Ensure you have the following installed:
* [Java Development Kit (JDK) 17](https://www.oracle.com/java/technologies/downloads/) or higher
* [Maven](https://maven.apache.org/)
* [MySQL Server](https://dev.mysql.com/downloads/installer/)

### 1. Clone the Repository
```bash
git clone [https://github.com/YourUsername/land-registry-backend.git](https://github.com/YourUsername/land-registry-backend.git)
cd land-registry-backend
```

### 2. Configure Database
```
Create a MySQL database named land_registry_db. Then, update the src/main/resources/application.properties file with your credentials:
spring.datasource.url=jdbc:mysql://localhost:3306/land_registry_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

```
### 3. Run the Application
   You can run the application using the Maven wrapper included in the project:
   ```
   ./mvnw spring-boot:run
```
The API will start at http://localhost:8080.


### 📡 API Endpoints

Method,Endpoint,Description
GET,/,List all registered lands
GET,/{id},Get details of a specific parcel
GET,/search?title={no},"Search by Title Number (e.g., KISII/BLOCK/1)"
POST,/,Register a new land parcel
PUT,/{id},Update land details


### 📂 Database Schema (Entities)
The system uses the following core entities (mapped via JPA):

Parcel: Represents the physical land (size, location, titleNumber).

TitleDeed: The legal document linking a Parcel to Owners.

Proprietor: The legal owner (linked via unique National ID/KRA PIN).

Encumbrance: Restrictions linked to a Title Deed.

### 🧪 Testing with Postman
A Postman_Collection.json file is included in the root directory.

Open Postman.

Import the JSON file.

Test the endpoints against localhost:8080.