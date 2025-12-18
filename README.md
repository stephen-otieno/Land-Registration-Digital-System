# Land Registration Digital System 

## 📖 Project Overview
The **Land Registration Digital System** is a full-stack digital solution designed to modernize land administration. It addresses challenges in manual record-keeping by providing a secure, efficient, and transparent platform for managing land parcels, title deeds, and ownership records.

This system is built to reflect the workflows of the **Kenyan Land Registration Act**, supporting features like official searches, title transfers, and encumbrance management (caveats/charges).

## 🏗️ Architecture & Tech Stack

The project follows a decoupled **Client-Server Architecture**:

### **Backend (Server-Side)**
* **Framework:** Java Spring Boot (v3.x)
* **Database:** H2 Database
* **ORM:** Hibernate (Spring Data JPA)
* **Build Tool:** Maven

### **Frontend (Client-Side)**
* **Framework:** React.js
* **Styling:** CSS3 / Bootstrap 5
* **HTTP Client:** Axios
* **Routing:** React Router DOM

---

## 📂 Project Structure

```bash
├── backend/               # Spring Boot Application
│   ├── src/               # Java Source Code
│   ├── pom.xml            # Maven Dependencies
│   └── mvnw               # Maven Wrapper
│
├── frontend/              # React Application
│   ├── src/               # React Components & Pages
│   ├── public/            # Static assets
│   └── package.json       # Node Dependencies
│
├── documentation/         #The entire project documentation    
│   └── UI_screenshots     #User interface screenshots      
│
├── README.md              # Project Documentation
└── .gitignore             # Git Ignore rules


```
### 🚀 Setup & Installation Guide
Follow these steps to run the full system locally.

#### 1. Prerequisites
Ensure you have the following installed on your machine:

Java JDK 17+

Node.js & npm (v16+)

Git


#### 3. Running the Backend
Navigate to the backend directory:

```
cd backend
```

Properties
```
spring.datasource.username=root
spring.datasource.password=your_password
Run the application:
```

```
./mvnw spring-boot:run
```

The Server will start on http://localhost:8080

### 4. Running the Frontend
Open a new terminal and navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```
Start the React development server:

```
npm start
```
The Client will launch on http://localhost:3000

### ⚡ Key Features
Land Search: Search for parcels using unique Title Numbers (e.g., KISII/BLOCK/450).

Registration: Digital forms for registering new land parcels and proprietors.

Title Management: Issue Freehold or Leasehold titles.

Encumbrances: Record and view restrictions like Bank Charges or Caveats.

Dashboard: Statistical overview of total registered lands.

### 📡 API Documentation
A Postman collection is included in the root directory (Postman_Collection.json) for testing API endpoints.

#### Common Endpoints:

GET /api/lands - Fetch all lands

POST /api/lands - Register new land

GET /api/lands/search?title={id} - Search land
