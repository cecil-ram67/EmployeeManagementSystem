import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

export default function LiveOperations({ activeIds, employees, leaveRequests, updateLeaveStatus }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Live Attendance */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                    <Clock color="#4ade80" size={20} /> Live Attendance
                </h3>
                {activeIds.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>No employees currently clocked in.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {activeIds.map(id => {
                            const emp = employees.find(e => e.id === id);
                            return emp ? (
                                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></div>
                                    <span>{emp.name}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#94a3b8' }}>{emp.role}</span>
                                </div>
                            ) : null;
                        })}
                    </div>
                )}
            </div>

            {/* Leave Inbox */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                    <CheckCircle color="#ec4899" size={20} /> Leave Requests
                </h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {leaveRequests.filter(req => req.status === 'Pending').length === 0 && (
                        <p style={{ color: '#94a3b8' }}>No pending requests.</p>
                    )}
                    {leaveRequests.filter(req => req.status === 'Pending').map(req => (
                        <div key={req.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold' }}>{req.empName}</span>
                                <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{req.date}</span>
                            </div>
                            <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.9rem' }}>{req.reason}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => updateLeaveStatus(req.id, 'Approved')} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#22c55e' }}>
                                    Approve
                                </button>
                                <button onClick={() => updateLeaveStatus(req.id, 'Rejected')} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#ef4444' }}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
