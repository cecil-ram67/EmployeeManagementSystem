package com.ferilion.employeemanagement.service;

import com.ferilion.employeemanagement.model.LeaveRequest;
import com.ferilion.employeemanagement.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public LeaveRequest requestLeave(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }
}
