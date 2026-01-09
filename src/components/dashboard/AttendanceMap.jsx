import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { OFFICE_LOCATION } from '../../config/locationConfig';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function AttendanceMap({ attendanceHistory, employees }) {
    // Filter to get only today's unique latest locations per employee
    // Or just show all recent check-ins? 
    // Let's show the Office Zone + Recent check-ins from today.

    const today = new Date().toLocaleDateString();

    // Get unique latest check-ins for map
    const markers = attendanceHistory
        .filter(h => h.location && new Date(h.timestamp).toLocaleDateString() === today)
        .reduce((acc, curr) => {
            // Keep the latest one per employee
            const existing = acc.find(item => item.empId === curr.empId);
            if (!existing) {
                acc.push(curr);
            }
            return acc;
        }, []);

    const center = [OFFICE_LOCATION.latitude, OFFICE_LOCATION.longitude];

    return (
        <div className="glass-panel" style={{ padding: '0', height: '400px', overflow: 'hidden', position: 'relative', marginBottom: '3rem' }}>
            <MapContainer center={center} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Office Zone */}
                <Circle
                    center={center}
                    radius={OFFICE_LOCATION.allowedRadiusMeters}
                    pathOptions={{ color: '#4ade80', fillColor: '#4ade80', fillOpacity: 0.2 }}
                />
                <Marker position={center}>
                    <Popup>Office Location <br /> Center of Geofence</Popup>
                </Marker>

                {/* Employee Markers */}
                {markers.map((record, idx) => (
                    <Marker
                        key={idx}
                        position={[record.location.latitude, record.location.longitude]}
                    >
                        <Popup>
                            <strong>{record.name}</strong><br />
                            {record.action} at {new Date(record.timestamp).toLocaleTimeString()}<br />
                            Status: {record.status || 'On Time'}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, background: 'rgba(0,0,0,0.7)', padding: '0.5rem', borderRadius: '8px', color: 'white', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <div style={{ width: 10, height: 10, background: '#4ade80', borderRadius: '50%', opacity: 0.5 }}></div> Office Zone
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={icon} alt="pin" style={{ width: 10 }} /> Employee
                </div>
            </div>
        </div>
    );
}
