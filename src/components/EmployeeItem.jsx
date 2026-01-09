import React, { useState } from "react";
import { DollarSign, Briefcase, Edit2, Trash2, Check, X, FileText, Lock, Hash } from "lucide-react";

export default function EmployeeItem({ emp, deleteEmployee, updateEmployee, onViewPayslip }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(emp.name);
  const [role, setRole] = useState(emp.role);
  const [department, setDepartment] = useState(emp.department || '');
  const [salary, setSalary] = useState(emp.salary);
  const [pin, setPin] = useState(emp.pin || '');
  const [employeeId, setEmployeeId] = useState(emp.employeeId || '');

  const handleUpdate = () => {
    updateEmployee({ ...emp, name, role, department, salary, pin, employeeId });
    setEdit(false);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginBottom: '1rem', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden' }}>

      {edit ? (
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="ID (e.g. EMP001)" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
          <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
          <input value={salary} type="number" onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
          <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="PIN (4 digits)" />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button className="btn" onClick={handleUpdate}>
              <Check size={16} /> Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEdit(false)}>
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Smart Avatar */}
            <div style={{
              width: '45px', height: '45px', borderRadius: '50%',
              background: `hsl(${name.length * 40}, 70%, 50%)`,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontWeight: 'bold', fontSize: '1.2rem', color: 'white',
              textShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}>
              {name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>

            <div>
              <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {emp.name}
                {emp.employeeId && <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>#{emp.employeeId}</span>}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <Briefcase size={14} /> {emp.role}
                </div>
                {emp.department && (
                  <span style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>
                    {emp.department}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                <DollarSign size={12} /> {parseInt(emp.salary).toLocaleString()}
              </div>
              {emp.pin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  <Lock size={10} /> PIN: {emp.pin}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={onViewPayslip} style={{ padding: '0.5rem' }} title="View Payslip">
              <FileText size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => setEdit(true)} style={{ padding: '0.5rem' }} title="Edit">
              <Edit2 size={18} />
            </button>
            <button className="btn btn-danger" onClick={() => deleteEmployee(emp.id)} style={{ padding: '0.5rem' }} title="Delete">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
