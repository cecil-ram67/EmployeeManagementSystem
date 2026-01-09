import React, { useState } from "react";
import EmployeeItem from "./EmployeeItem";
import PayslipModal from "./PayslipModal";

export default function EmployeeList({ employees, deleteEmployee, updateEmployee }) {
  const [viewPayslip, setViewPayslip] = useState(null);

  return (
    <div className="list">
      {employees.length === 0 && <p style={{ color: '#94a3b8', textAlign: 'center' }}>No employees found</p>}

      {employees.map(emp => (
        <EmployeeItem
          key={emp.id}
          emp={emp}
          deleteEmployee={deleteEmployee}
          updateEmployee={updateEmployee}
          onViewPayslip={() => setViewPayslip(emp)}
        />
      ))}

      {viewPayslip && (
        <PayslipModal
          emp={viewPayslip}
          onClose={() => setViewPayslip(null)}
        />
      )}
    </div>
  );
}
