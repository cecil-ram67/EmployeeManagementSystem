# 📍 Geo-Fenced Smart Employee Management System

## 🎓 Project Overview
This is a comprehensive **Employee Management System** designed to modernize workforce tracking. It leverages **Geolocation (GPS)** to ensure employees can only clock in when they are physically present at the office. The system also includes advanced security features like **PIN Verification** to prevent proxy attendance ("buddy punching") and administrative tools for payroll and shift management.

## 🚀 Key Features

### 1. 🌍 Geo-Fenced Attendance
-   **Problem**: Employees clocking in from home or outside the office.
-   **Solution**: The system calculates the distance between the employee's device and the office coordinates (`locationConfig.js`). Clock-in is blocked if the distance > 100 meters.

### 2. 🔐 Anti-Buddy Punching (Security)
-   **Problem**: One employee marking attendance for another.
-   **Solution**: **PIN Verification**. Every employee has a unique 4-digit PIN. To Clock In/Out, the specific PIN must be entered.

### 3. ⏰ Shift Management & Late Marking
-   **Logic**: Office starts at 09:30 AM (configurable).
-   **Visual**: If an employee clocks in after the 15-minute grace period, they are automatically marked as **LATE** (Red Badge).

### 4. 🗺️ Visual Analytics
-   **Live Map**: An interactive map (using Leaflet) shows the exact location of every check-in relative to the office zone.
-   **Dashboard**: Real-time stats on total salary, active employees, and leave requests.

### 5. 📄 Payroll & Reports
-   **Payslips**: Auto-generates professional PDF payslips with tax breakdowns.
-   **Exports**: One-click CSV export for "End of Day" reports.

---

## 🛠️ Technology Stack
-   **Frontend**: React.js (Vite)
-   **Styling**: CSS Modules / Lucide Icons
-   **Maps**: React Leaflet / OpenStreetMap
-   **PDF Generation**: jsPDF
-   **State Management**: React Hooks + LocalStorage (Prototyping)

---

## 📸 How to Run
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Server**:
    ```bash
    npm run dev
    ```
3.  **Access**:
    -   **Admin Dashboard**: `/admin`
    -   **Employee Portal**: `/portal`
