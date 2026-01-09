package com.ferilion.employeemanagement.repository;

import com.ferilion.employeemanagement.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmpId(Long empId);
}
