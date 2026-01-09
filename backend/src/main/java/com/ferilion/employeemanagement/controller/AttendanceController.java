package com.ferilion.employeemanagement.controller;

import com.ferilion.employeemanagement.model.Attendance;
import com.ferilion.employeemanagement.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/mark")
    public Map<String, Object> markAttendance(@RequestBody Attendance attendance) {
        Attendance savedAttendance = attendanceService.markAttendance(attendance);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message",
                "Clocked " + (attendance.getAction() != null ? attendance.getAction() : "action") + " successfully");
        return response;
    }

    @GetMapping("/history")
    public List<Attendance> getAttendanceHistory() {
        return attendanceService.getAttendanceHistory();
    }
}
