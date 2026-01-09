import React from 'react';
import { X, DollarSign, Printer, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PayslipModal({ emp, onClose }) {
    if (!emp) return null;

    const basicSalary = Number(emp.salary);
    const hra = basicSalary * 0.4;
    const da = basicSalary * 0.2;
    const gross = basicSalary + hra + da;
    const tax = gross * 0.1; // 10% Tax
    const netPay = gross - tax;
    const payDate = new Date().toLocaleDateString();

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text("Payslip", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Company Name Inc.", 105, 30, { align: "center" });

        doc.line(20, 35, 190, 35); // Horizontal Line

        // Employee Details
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Employee Name: ${emp.name}`, 20, 50);
        doc.text(`Role: ${emp.role}`, 20, 58);
        doc.text(`Employee ID: ${emp.employeeId || 'N/A'}`, 20, 66);
        doc.text(`Date: ${payDate}`, 150, 50);

        // Salary Table
        autoTable(doc, {
            startY: 80,
            head: [['Earnings', 'Amount', 'Deductions', 'Amount']],
            body: [
                ['Basic Salary', `Rs. ${basicSalary.toFixed(2)}`, 'Income Tax (10%)', `Rs. ${tax.toFixed(2)}`],
                ['HRA (40%)', `Rs. ${hra.toFixed(2)}`, '', ''],
                ['DA (20%)', `Rs. ${da.toFixed(2)}`, '', ''],
                ['', '', '', ''], // Spacer
                ['Gross Earnings', `Rs. ${gross.toFixed(2)}`, 'Total Deductions', `Rs. ${tax.toFixed(2)}`],
            ],
            theme: 'grid',
            headStyles: { fillColor: [66, 66, 66] },
            styles: { fontSize: 10, cellPadding: 3 },
            columnStyles: {
                0: { fontStyle: 'bold' },
                2: { fontStyle: 'bold' }
            }
        });

        // Net Pay Box
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFillColor(240, 240, 240);
        doc.rect(130, finalY, 60, 20, 'F');
        doc.setFontSize(11);
        doc.text("Net Pay", 135, finalY + 8);
        doc.setFontSize(16);
        doc.setTextColor(34, 197, 94); // Green
        doc.text(`Rs. ${netPay.toFixed(2)}`, 135, finalY + 16);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("This is a computer-generated document.", 105, 280, { align: "center" });

        doc.save(`payslip_${emp.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }} onClick={onClose}>
            <div
                className="glass-panel animate-fade-in"
                style={{ width: '90%', maxWidth: '500px', background: '#1e293b', border: '1px solid #475569', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Payslip Generated</h2>
                        <p style={{ margin: '0.2rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Date: {payDate}</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{emp.name}</h3>
                        <span style={{ background: '#334155', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', color: '#cbd5e1', display: 'inline-block', marginTop: '0.5rem' }}>
                            {emp.role}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Basic Salary</span>
                            <span>₹{basicSalary.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>HRA (40%)</span>
                            <span>₹{hra.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>DA (20%)</span>
                            <span>₹{da.toFixed(2)}</span>
                        </div>
                        <div style={{ borderTop: '1px dashed #475569', margin: '0.5rem 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80', fontWeight: 'bold' }}>
                            <span>Gross Earnings</span>
                            <span>₹{gross.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f472b6' }}>
                            <span>Tax Deductions (10%)</span>
                            <span>- ₹{tax.toFixed(2)}</span>
                        </div>
                        <div style={{ borderTop: '2px solid #475569', margin: '0.5rem 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 800 }}>
                            <span>Net Pay</span>
                            <span style={{ color: '#818cf8' }}>₹{netPay.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '1rem' }}>
                    <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePrint}>
                        <Printer size={18} /> Print
                    </button>
                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleDownloadPDF}>
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
