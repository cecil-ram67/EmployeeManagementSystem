# 📚 College Project Report Guide

Use this structure to explain your project in your report or Viva presentation.

## 1. Introduction
> "In traditional organizations, tracking employee attendance is manual and prone to errors. Our project, the **Geo-Fenced Employee Management System**, automates this using modern web technologies."

## 2. Problem Statement
*   **Proxy Attendance**: Employees clocking in for friends.
*   **Remote Clock-ins**: Marking attendance while not at the office.
*   **Manual Payroll**: Calculating salaries and taxes via Excel is slow.

## 3. Proposed Solution
We built a web application that solves these using:
1.  **Geofencing**: Uses the Haversine formula to strictly enforce location-based attendance.
2.  **Two-Factor Auth**: Basic ID + PIN verification for security.
3.  **Automation**: Auto-calculates Lateness and Net Pay (Salary - Tax).

## 4. System Architecture
*   **Frontend**: React.js for a dynamic, single-page application experience.
*   **Algorithm**: used `Haversine Formula` to calculate distance between two GPS coordinates:
    ```javascript
    d = 2R × sin⁻¹(√[sin²((θ₂ - θ₁)/2) + cosθ₁ × cosθ₂ × sin²((φ₂ - φ₁)/2)])
    ```
    *(Tip: Writing this formula on the board during Viva impresses external examiners!)*

## 5. Modules Description
1.  **Admin Module**: Dashboard, Employee CRUD, Map View, Leave Approval.
2.  **User Module**: Geolocation check, PIN Authentication, Clock In/Out.
3.  **Config Module**: Centralized settings for Office Location and Shift Timings.

## 6. Future Scope
*   **Backend Integration**: connect to Spring Boot / MySQL for permanent data storage.
*   **Mobile App**: Building a React Native version for mobile phones.
