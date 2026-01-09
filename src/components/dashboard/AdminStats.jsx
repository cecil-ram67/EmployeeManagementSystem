import React from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminStats({ employees, totalSalary, avgSalary }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '12px', borderRadius: '12px' }}>
                    <Users color="#818cf8" size={24} />
                </div>
                <div>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Total Employees</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{employees.length}</h3>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '12px', borderRadius: '12px' }}>
                    <DollarSign color="#4ade80" size={24} />
                </div>
                <div>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Total Payroll</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>₹{totalSalary.toLocaleString()}</h3>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '12px', borderRadius: '12px' }}>
                    <TrendingUp color="#f472b6" size={24} />
                </div>
                <div>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Average Salary</p>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>₹{avgSalary.toLocaleString()}</h3>
                </div>
            </div>
        </div>
    );
}
