package com.ferilion.employeemanagement.service;

import com.ferilion.employeemanagement.model.Attendance;
import com.ferilion.employeemanagement.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceHistory() {
        return attendanceRepository.findAll();
    }
}
