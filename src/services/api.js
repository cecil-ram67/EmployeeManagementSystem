const BASE_URL = "http://localhost:8080/api/v1";

export const api = {
    // Employees
    getEmployees: async () => {
        const response = await fetch(`${BASE_URL}/employees`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        return response.json();
    },

    createEmployee: async (employee) => {
        const response = await fetch(`${BASE_URL}/employees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee),
        });
        if (!response.ok) throw new Error("Failed to create employee");
        return response.json();
    },

    // Attendance
    markAttendance: async (data) => {
        const response = await fetch(`${BASE_URL}/attendance/mark`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to mark attendance");
        return response.json();
    },

    getAttendanceHistory: async () => {
        const response = await fetch(`${BASE_URL}/attendance/history`);
        if (!response.ok) throw new Error("Failed to fetch attendance history");
        return response.json();
    },

    // Leaves
    requestLeave: async (data) => {
        const response = await fetch(`${BASE_URL}/leaves/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to request leave");
        return response.json();
    }
};
