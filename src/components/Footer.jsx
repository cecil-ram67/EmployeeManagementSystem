import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="glass-panel" style={{ marginTop: 'auto', borderRadius: '16px 16px 0 0', borderBottom: 'none' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '2rem 0' }}>

                    {/* Company Info */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            EmpManage
                        </h3>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                            Streamlining workforce management for modern enterprises. Build better teams, faster.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#fff' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#94a3b8' }}>
                                <MapPin size={18} color="#818cf8" />
                                <span>123 Tech Park, Innovation Way, Silicon Valley, CA</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#94a3b8' }}>
                                <Phone size={18} color="#818cf8" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#94a3b8' }}>
                                <Mail size={18} color="#818cf8" />
                                <span>contact@empmanage.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#fff' }}>Follow Us</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.3s' }} className="social-link"><Facebook size={24} /></a>
                            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.3s' }} className="social-link"><Twitter size={24} /></a>
                            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.3s' }} className="social-link"><Linkedin size={24} /></a>
                            <a href="#" style={{ color: '#94a3b8', transition: 'color 0.3s' }} className="social-link"><Instagram size={24} /></a>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', textAlign: 'center', color: '#64748b' }}>
                    &copy; {new Date().getFullYear()} EmpManage Solutions. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
