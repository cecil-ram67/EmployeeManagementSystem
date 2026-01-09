import React, { useEffect, useState, useMemo } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AdminStats from "../components/dashboard/AdminStats";
import LiveOperations from "../components/dashboard/LiveOperations";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import { Search, Download, Calendar, Bell } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../services/api";

import AttendanceMap from "../components/dashboard/AttendanceMap";

export default function Admin() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [activeIds, setActiveIds] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [activityLog, setActivityLog] = useState([]);
    const [attendanceHistory, setAttendanceHistory] = useState([]);

    // Load data (READ)
    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch Employees from Backend
                const fetchedEmployees = await api.getEmployees();
                setEmployees(fetchedEmployees);
            } catch (error) {
                console.error("Failed to load employees", error);
                // toast.error("Failed to load employees");
            }

            // Keep other data mocked/local for now as backend doesn't support them all yet
            // Or fetched from their respective endpoints if available
            try {
                const history = await api.getAttendanceHistory();
                setAttendanceHistory(history);

                // Calculate active IDs based on history (rudimentary)
                // In a real app, backend should provide active status
                // For now, let's trust the history logic if we had it, but simple hack:
                // We'll rely on local storage for 'active' simulation or just omit for now if not needed
                const active = JSON.parse(localStorage.getItem("attendance_record")) || [];
                setActiveIds(active);
            } catch (e) { console.error(e) }

            const leaves = JSON.parse(localStorage.getItem("leave_requests")) || [];
            if (JSON.stringify(leaves) !== JSON.stringify(leaveRequests)) setLeaveRequests(leaves);

            const activities = JSON.parse(localStorage.getItem("activity_log")) || [];
            if (JSON.stringify(activities) !== JSON.stringify(activityLog)) setActivityLog(activities);
        };

        // Initial load
        loadData();

        // Poll for updates (Real-time sync)
        const interval = setInterval(loadData, 5000); // 5s poll

        return () => clearInterval(interval);
    }, []);

    // Sync leaves for approval
    const updateLeaveStatus = (reqId, status) => {
        const updatedLeaves = leaveRequests.map(req =>
            req.id === reqId ? { ...req, status } : req
        );
        setLeaveRequests(updatedLeaves);
        localStorage.setItem("leave_requests", JSON.stringify(updatedLeaves));
        toast.success(`Leave request ${status}`);
    };

    // CREATE
    const addEmployee = async (employee) => {
        try {
            const response = await api.createEmployee(employee);
            if (response.success) {
                // Refresh list or add locally
                // response.data.id contains the DB id
                const newEmp = { ...employee, id: response.data.id };
                setEmployees(prev => [...prev, newEmp]);
                toast.success("Employee added successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add employee");
        }
    };

    // DELETE
    const deleteEmployee = (id) => {
        // Backend TODO: Implement Delete
        setEmployees(prev => prev.filter(emp => emp.id !== id));
        toast.success("Employee deleted (Local only - Backend not connected for Delete)");
    };

    // UPDATE
    const updateEmployee = (updatedEmp) => {
        // Backend TODO: Implement Update
        setEmployees(prev =>
            prev.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp)
        );
        toast.success("Employee updated (Local only - Backend not connected for Update)");
    };

    // CSV EXPORT
    const exportToCSV = () => {
        const headers = ["ID,Name,Role,Department,Salary,Joined"];
        const rows = employees.map(e => `${e.id},${e.name},${e.role},${e.department || 'N/A'},${e.salary},${new Date().toLocaleDateString()}`);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `employee_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Report downloaded successfully!");
    };

    const exportAttendanceLog = () => {
        const history = JSON.parse(localStorage.getItem('attendance_history')) || [];
        if (history.length === 0) return toast.error("No attendance history found");

        const headers = ["Timestamp,Employee ID,Name,Action,Status"];
        const rows = history.map(h => `${new Date(h.timestamp).toLocaleString()},${h.empId},${h.name},${h.action},${h.status || '-'}`);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `attendance_log_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Attendance Log downloaded!");
    };

    // OPTIMIZED CALCULATIONS
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp =>
            emp.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [employees, search]);

    const totalSalary = useMemo(() => employees.reduce((acc, emp) => acc + Number(emp.salary), 0), [employees]);
    const avgSalary = useMemo(() => employees.length ? Math.round(totalSalary / employees.length) : 0, [employees, totalSalary]);

    return (
        <div className="container animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>Administrator Dashboard</h1>

                {/* Refactored Components */}
                <AdminStats
                    employees={employees}
                    totalSalary={totalSalary}
                    avgSalary={avgSalary}
                />

                <AttendanceMap attendanceHistory={attendanceHistory} employees={employees} />

                <LiveOperations
                    activeIds={activeIds}
                    employees={employees}
                    leaveRequests={leaveRequests}
                    updateLeaveStatus={updateLeaveStatus}
                />

                <AnalyticsCharts employees={employees} />

                {/* Management Console Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Management Console
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" onClick={exportAttendanceLog} style={{ gap: '0.5rem', background: '#334155' }}>
                            <Calendar size={18} /> Attendance Log
                        </button>
                        <button className="btn" onClick={exportToCSV} style={{ gap: '0.5rem' }}>
                            <Download size={18} /> Employee Report
                        </button>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                placeholder="Search employee..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                    </div>
                </div >

                {/* Recent Activity Feed */}
                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '3rem', maxHeight: '200px', overflowY: 'auto' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, marginBottom: '1rem' }}>
                        <Bell color="#fbbf24" size={20} /> Recent Activity
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {activityLog.length === 0 && <p style={{ color: '#94a3b8' }}>No recent activity.</p>}
                        {activityLog.map(act => (
                            <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: '#cbd5e1', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                                <span style={{ color: '#94a3b8', fontSize: '0.8rem', minWidth: '80px' }}>{act.time}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {act.text}
                                    {act.status === 'Late' && (
                                        <span style={{ fontSize: '0.7rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                                            LATE
                                        </span>
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <EmployeeForm addEmployee={addEmployee} employees={employees} />

                <h2 style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Employee Directory ({filteredEmployees.length})
                </h2>

                <EmployeeList
                    employees={filteredEmployees}
                    deleteEmployee={deleteEmployee}
                    updateEmployee={updateEmployee}
                />
            </div>
        </div>
    );
}
