import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '1234') {
            sessionStorage.setItem('admin_auth', 'true');
            toast.success('Welcome back, Admin!');
            navigate('/admin');
        } else {
            toast.error('Invalid PIN Access Denied');
            setPin('');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.2)', width: 'fit-content', padding: '20px', borderRadius: '50%', margin: '0 auto 2rem' }}>
                    <Lock size={40} color="#818cf8" />
                </div>

                <h2 style={{ marginBottom: '0.5rem' }}>Admin Access</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Enter security PIN to continue</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter PIN (1234)"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem', marginBottom: '1.5rem' }}
                        maxLength={4}
                        autoFocus
                    />
                    <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
