package com.ferilion.employeemanagement.repository;

import com.ferilion.employeemanagement.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmpId(Long empId);
}
