import React, { useState, useEffect } from 'react';
import { Clock, Calendar, UserCheck, Search, LogOut, LogIn, MapPin, AlertCircle, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { OFFICE_LOCATION } from '../config/locationConfig';
import { SHIFT_CONFIG } from '../config/attendanceConfig';
import { api } from '../services/api';

// Haversine formula to calculate distance in meters
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const ϕ1 = lat1 * Math.PI / 180;
    const ϕ2 = lat2 * Math.PI / 180;
    const Δϕ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δϕ / 2) * Math.sin(Δϕ / 2) +
        Math.cos(ϕ1) * Math.cos(ϕ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};

export default function EmployeePortal() {
    const [employees, setEmployees] = useState([]);
    const [clockedInIds, setClockedInIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Geolocation State
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distanceToOffice, setDistanceToOffice] = useState(null);
    const [locationError, setLocationError] = useState('');
    const [isAdminOverride, setIsAdminOverride] = useState(false); // For testing/override

    // For Leave Request Modal
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [selectedLeaveEmp, setSelectedLeaveEmp] = useState(null);
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveDate, setLeaveDate] = useState('');


    // PIN Verification State
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [enteredPin, setEnteredPin] = useState('');
    const [pendingAuth, setPendingAuth] = useState(null); // { id, name }

    useEffect(() => {
        // Load Data from API
        const fetchData = async () => {
            try {
                const emps = await api.getEmployees();
                setEmployees(emps);
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        };
        fetchData();

        const activeData = JSON.parse(localStorage.getItem('attendance_record')) || [];
        setClockedInIds(activeData);

        // Geolocation Setup
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });

                const dist = calculateDistance(
                    latitude,
                    longitude,
                    OFFICE_LOCATION.latitude,
                    OFFICE_LOCATION.longitude
                );
                setDistanceToOffice(Math.round(dist));
                setLocationError('');
            },
            (error) => {
                console.error("Location error:", error);
                if (error.code === 1) setLocationError('Location permission denied. Please allow access.');
                else if (error.code === 2) setLocationError('Location unavailable.');
                else if (error.code === 3) setLocationError('Location request timed out.');
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const initiateAttendance = (empId, empName) => {
        // Geofencing Check (Skip if key override is active for testing)
        if (!isAdminOverride) {
            if (locationError) return toast.error(locationError);
            if (distanceToOffice === null) return toast.error("Fetching location... please wait.");

            if (distanceToOffice > OFFICE_LOCATION.allowedRadiusMeters) {
                return toast.error(`You are ${distanceToOffice}m away! Must be within ${OFFICE_LOCATION.allowedRadiusMeters}m to clock in.`);
            }
        }

        // Open PIN Modal
        setPendingAuth({ id: empId, name: empName });
        setEnteredPin('');
        setIsPinModalOpen(true);
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();

        const employee = employees.find(emp => emp.id === pendingAuth.id);

        if (!employee) return toast.error("Employee not found");

        if (employee.pin !== enteredPin) {
            return toast.error("Invalid PIN");
        }

        // Success - Execute Attendance
        executeAttendance(pendingAuth.id, pendingAuth.name);
        setIsPinModalOpen(false);
        setPendingAuth(null);
    };

    const executeAttendance = async (empId, empName) => {
        const id = Number(empId);
        let activeData = JSON.parse(localStorage.getItem('attendance_record')) || [];
        const isCurrentlyClockedIn = activeData.includes(id);

        // Calculate Late Status (Only for Clock IN)
        let attendanceStatus = 'On Time';
        if (!isCurrentlyClockedIn) {
            if (SHIFT_CONFIG.isLate(new Date())) {
                attendanceStatus = 'Late';
                toast("Marked as Late", { icon: '⚠️', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
            }
        }

        try {
            await api.markAttendance({
                empId: id,
                action: isCurrentlyClockedIn ? 'OUT' : 'IN',
                timestamp: new Date().toISOString(),
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
                status: isCurrentlyClockedIn ? '-' : attendanceStatus
            });

            let newActiveData;
            if (isCurrentlyClockedIn) {
                newActiveData = activeData.filter(recordId => recordId !== id);
                toast.success(`Clocked Out: ${empName}`);
            } else {
                newActiveData = [...activeData, id];
                if (attendanceStatus === 'On Time') toast.success(`Clocked In: ${empName}`);
            }

            setClockedInIds(newActiveData);
            localStorage.setItem('attendance_record', JSON.stringify(newActiveData));

            // Log to local activity for immediate UI feedback (optional, or rely on polling)
            const activity = JSON.parse(localStorage.getItem('activity_log')) || [];
            activity.unshift({
                id: Date.now(),
                text: `${empName} ${isCurrentlyClockedIn ? 'Clocked Out' : 'Clocked In'}`,
                time: new Date().toLocaleTimeString(),
                type: isCurrentlyClockedIn ? 'out' : 'in',
                status: !isCurrentlyClockedIn ? attendanceStatus : null
            });
            if (activity.length > 50) activity.pop();
            localStorage.setItem('activity_log', JSON.stringify(activity));

        } catch (error) {
            console.error(error);
            toast.error("Failed to mark attendance on server");
        }
    };

    const openLeaveModal = (employee) => {
        setSelectedLeaveEmp(employee);
        setIsLeaveModalOpen(true);
    };

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();
        if (!leaveDate || !leaveReason) return toast.error('Please fill all fields');

        try {
            await api.requestLeave({
                empId: selectedLeaveEmp.id,
                date: leaveDate,
                reason: leaveReason
            });

            // Local fallback for immediate UI update (optional)
            const newRequest = {
                id: Date.now(),
                empId: selectedLeaveEmp.id,
                empName: selectedLeaveEmp.name,
                date: leaveDate,
                reason: leaveReason,
                status: 'Pending'
            };
            const requests = JSON.parse(localStorage.getItem('leave_requests')) || [];
            requests.push(newRequest);
            localStorage.setItem('leave_requests', JSON.stringify(requests));

            toast.success(`Leave request sent for ${selectedLeaveEmp.name}`);
            setIsLeaveModalOpen(false);
            setLeaveDate('');
            setLeaveReason('');
            setSelectedLeaveEmp(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit leave request");
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isWithinRange = distanceToOffice !== null && distanceToOffice <= OFFICE_LOCATION.allowedRadiusMeters;

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Employee Attendance Portal</h1>

                {/* Geolocation Status Banner */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '0.8rem 1.5rem',
                    background: locationError ? 'rgba(239, 68, 68, 0.1)' : isWithinRange ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    border: `1px solid ${locationError ? '#ef4444' : isWithinRange ? '#22c55e' : '#eab308'}`,
                    borderRadius: '20px',
                    color: locationError ? '#f87171' : isWithinRange ? '#4ade80' : '#facc15'
                }}>
                    {locationError ? <AlertCircle size={20} /> : <MapPin size={20} />}
                    <span>
                        {locationError ? locationError :
                            distanceToOffice === null ? 'Locating...' :
                                isWithinRange ? `You are at the office (${distanceToOffice}m)` :
                                    `You are too far (${distanceToOffice}m). Office is ${OFFICE_LOCATION.allowedRadiusMeters}m range.`}
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ maxWidth: '600px', margin: '0 auto 3rem', position: 'relative' }}>
                <Search className="absolute left-3 top-3 text-slate-400" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                    type="text"
                    placeholder="Search employees by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        fontSize: '1.1rem',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        color: 'white'
                    }}
                />
            </div>

            {/* Employee Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {filteredEmployees.map(emp => {
                    const isClockedIn = clockedInIds.includes(emp.id);
                    return (
                        <div key={emp.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '4px',
                                height: '100%',
                                background: isClockedIn ? '#4ade80' : '#64748b'
                            }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem' }}>{emp.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{emp.role}</p>
                                </div>
                                <div style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    background: isClockedIn ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                                    color: isClockedIn ? '#4ade80' : '#94a3b8',
                                    border: `1px solid ${isClockedIn ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)'}`
                                }}>
                                    {isClockedIn ? 'CLOCKED IN' : 'OFFLINE'}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
                                <button
                                    onClick={() => initiateAttendance(emp.id, emp.name)}
                                    // Disable clock-in if out of range, but allow clock-out always (optional, here blocking both for simplicity unless we want to allow remote clockout)
                                    // Actually, usually you want to allow clock OUT from anywhere? Or also restricted? 
                                    // Requirement said "employee will able to clockin within 100m". 
                                    // Let's enable button but show toast error if check fails inside handler.
                                    className={`btn ${isClockedIn ? 'btn-danger' : 'btn-primary'}`}
                                    style={{
                                        justifyContent: 'center',
                                        padding: '0.75rem',
                                        opacity: (!isWithinRange && !isClockedIn) ? 0.7 : 1, // Visual cue
                                        background: isClockedIn ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                                        color: isClockedIn ? '#f87171' : '#4ade80',
                                        border: `1px solid ${isClockedIn ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                                    }}
                                >
                                    {isClockedIn ? <LogOut size={18} /> : <LogIn size={18} />}
                                    <span style={{ marginLeft: '0.5rem' }}>{isClockedIn ? 'Clock Out' : 'Clock In'}</span>
                                </button>

                                <button
                                    onClick={() => openLeaveModal(emp)}
                                    className="btn"
                                    style={{
                                        justifyContent: 'center',
                                        padding: '0.75rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <Calendar size={18} />
                                    <span style={{ marginLeft: '0.5rem' }}>Leave</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Modal Logic (Same as before) -- Including brief version to save tokens if logic unchanged */}
            {isLeaveModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'
                }} onClick={() => setIsLeaveModalOpen(false)}>
                    <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
                        <h3>Request Leave for {selectedLeaveEmp?.name}</h3>
                        <form onSubmit={handleLeaveSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Date</label>
                                <input type="date" required value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Reason</label>
                                <textarea required placeholder="Reason..." value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} style={{ width: '100%', padding: '0.8rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', minHeight: '100px' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setIsLeaveModalOpen(false)} className="btn" style={{ flex: 1, background: 'transparent', border: '1px solid #334155' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* PIN Verification Modal */}
            {
                isPinModalOpen && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(5px)'
                    }} onClick={() => setIsPinModalOpen(false)}>
                        <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', padding: '2rem', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Lock size={30} color="#4ade80" />
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Enter PIN</h3>
                            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Please enter your 4-digit security PIN to confirm it's you.</p>

                            <form onSubmit={handlePinSubmit}>
                                <input
                                    autoFocus
                                    type="password"
                                    pattern="\d*"
                                    maxLength="4"
                                    placeholder="0 0 0 0"
                                    value={enteredPin}
                                    onChange={e => setEnteredPin(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        fontSize: '1.5rem',
                                        textAlign: 'center',
                                        letterSpacing: '0.5rem',
                                        background: '#0f172a',
                                        border: '1px solid #334155',
                                        borderRadius: '12px',
                                        color: 'white',
                                        marginBottom: '2rem'
                                    }}
                                />

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={() => setIsPinModalOpen(false)} className="btn" style={{ flex: 1, justifyContent: 'center', background: 'transparent', border: '1px solid #334155' }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Verify</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
