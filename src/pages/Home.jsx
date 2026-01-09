import React from 'react';
import { Users, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <div style={{
                textAlign: 'center',
                padding: '4rem 0',
                background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
            }} className="animate-fade-in">
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Manage Your Team <br />
                    <span style={{ color: '#818cf8', WebkitTextFillColor: '#818cf8' }}>With Confidence</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    The modern solution for tracking employee data, roles, and compensation. secure, fast, and beautiful.
                </p>

                <Link to="/admin" className="btn" style={{ textDecoration: 'none', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    Get Started <ArrowRight size={20} />
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
                        <div style={{ background: 'rgba(99, 102, 241, 0.2)', width: 'fit-content', padding: '10px', borderRadius: '12px', marginBottom: '1rem' }}>
                            <Users color="#818cf8" size={32} />
                        </div>
                        <h3>Team Overview</h3>
                        <p style={{ color: '#94a3b8' }}>Get a bird's eye view of your entire organization structure.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
                        <div style={{ background: 'rgba(236, 72, 153, 0.2)', width: 'fit-content', padding: '10px', borderRadius: '12px', marginBottom: '1rem' }}>
                            <TrendingUp color="#f472b6" size={32} />
                        </div>
                        <h3>Performance Tracking</h3>
                        <p style={{ color: '#94a3b8' }}>Monitor salary distribution and role allocation efficiently.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
                        <div style={{ background: 'rgba(34, 197, 94, 0.2)', width: 'fit-content', padding: '10px', borderRadius: '12px', marginBottom: '1rem' }}>
                            <Shield color="#4ade80" size={32} />
                        </div>
                        <h3>Admin Controls</h3>
                        <p style={{ color: '#94a3b8' }}>Secure area to manage sensitive employee data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
