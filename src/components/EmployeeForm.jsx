import React, { useState } from "react";
import { UserPlus, User, Briefcase, DollarSign, Lock, Hash } from "lucide-react";
import toast from "react-hot-toast";

export default function EmployeeForm({ addEmployee, employees }) {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !role || !department || !salary || !pin || !employeeId) {
      toast.error("All fields are required!");
      return;
    }

    // Uniqueness Check
    if (employees && employees.some(emp => emp.employeeId === employeeId)) {
      return toast.error("Employee ID already exists!");
    }

    addEmployee({
      id: Date.now(),
      employeeId,
      name,
      role,
      department,
      salary,
      pin
    });

    setName("");
    setRole("");
    setDepartment("");
    setSalary("");
    setPin("");
    setEmployeeId("");
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <UserPlus className="text-accent" />
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div style={{ position: 'relative' }}>
          <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Hash size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Employee ID (e.g. EMP001)"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Role (e.g. Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Briefcase size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ paddingLeft: '2.5rem', width: '100%', height: '42px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #475569', color: 'white', borderRadius: '8px', appearance: 'none', cursor: 'pointer' }}
          >
            <option value="" style={{ color: 'black' }}>Select Department</option>
            <option value="Engineering" style={{ color: 'black' }}>Engineering</option>
            <option value="Marketing" style={{ color: 'black' }}>Marketing</option>
            <option value="HR" style={{ color: 'black' }}>HR</option>
            <option value="Sales" style={{ color: 'black' }}>Sales</option>
            <option value="Operations" style={{ color: 'black' }}>Operations</option>
          </select>
        </div>

        <div style={{ position: 'relative' }}>
          <DollarSign size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Assign 4-digit PIN"
            maxLength="4"
            pattern="\d{4}"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <button className="btn" style={{ justifyContent: 'center' }}>
          <UserPlus size={18} />
          Add To Team
        </button>
      </form>
    </div>
  );
}
