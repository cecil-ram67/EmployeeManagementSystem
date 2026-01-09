👔 Employee Management System

A full-stack Employee Management System built using Spring Boot (Backend) and React (Frontend).
This application helps organizations manage employees, attendance, leave requests, and basic admin analytics.

🧑‍💻 Tech Stack
Backend (Spring Boot)

Java

Spring Boot

Spring Data JPA

REST APIs

Maven

MySQL / H2 (configurable)

Frontend (React)

React (Vite)

JavaScript (ES6+)

HTML5, CSS3

Axios (API communication)

Component-based architecture

📁 Project Structure
EmployeeManagementSystem/
│
├── backend/                  # Spring Boot Backend
│   ├── src/main/java
│   │   └── com/ferilion/employeemanagement
│   │       ├── controller
│   │       ├── service
│   │       ├── repository
│   │       └── model
│   ├── src/main/resources
│   │   └── application.properties
│   └── pom.xml
│
├── src/                      # React Frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── config
│   └── assets
│
├── public/
├── package.json
├── vite.config.js
├── README.md
└── .gitignore

✨ Features
-> Employee Module

Add, update, delete employees

View employee details

-> Attendance Module

Mark employee attendance

Track attendance records

-> Leave Management

Apply for leave

Approve / reject leave requests

-> Admin Dashboard (Frontend)

Employee statistics

Attendance analytics

Live operational views

⚙️ How to Run the Project
🔹 Backend (Spring Boot)

Go to backend folder:

cd backend


Run the application:

mvn spring-boot:run


Backend will start at:

http://localhost:8080

🔹 Frontend (React)

Go to project root:

npm install


Start React app:

npm run dev


Frontend will run at:

http://localhost:5173

🔗 API Overview (Sample)
Method	Endpoint	Description
GET	/employees	Get all employees
POST	/employees	Add new employee
GET	/attendance	View attendance
POST	/leave/apply	Apply leave
PUT	/leave/approve	Approve leave
🛠️ Future Enhancements

🔐 JWT Authentication & Role-based access

🗄️ Production Database (MySQL/PostgreSQL)

📦 Docker support

☁️ Cloud deployment (AWS / Render)

📱 Mobile-friendly UI

👨‍💻 Author

Ram (Cecil-ram67)
GitHub: https://github.com/cecil-ram67

⭐ Support

If you like this project, don’t forget to star ⭐ the repository!