import React from 'react';
import { PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AnalyticsCharts({ employees }) {
    // Helper to calculate role distribution
    const roleData = Object.entries(employees.reduce((acc, emp) => {
        acc[emp.role] = (acc[emp.role] || 0) + 1;
        return acc;
    }, {})).map(([name, value]) => ({ name, value }));

    // Colors for pie chart
    const COLORS = ['#818cf8', '#ec4899', '#4ade80', '#f472b6', '#fbbf24', '#22d3ee'];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Role Distribution Chart */}
            <div className="glass-panel" style={{ padding: '1.5rem', height: '350px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                    <PieIcon color="#818cf8" size={20} /> Role Distribution
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={roleData}
                            cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label
                        >
                            {roleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Salary Range Chart */}
            <div className="glass-panel" style={{ padding: '1.5rem', height: '350px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                    <BarIcon color="#4ade80" size={20} /> Salary Overview
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employees.map(e => ({ name: e.name, salary: Number(e.salary) }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                        <Bar dataKey="salary" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
