package com.ferilion.employeemanagement.controller;

import com.ferilion.employeemanagement.model.LeaveRequest;
import com.ferilion.employeemanagement.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping("/request")
    public Map<String, Object> requestLeave(@RequestBody LeaveRequest leaveRequest) {
        LeaveRequest savedLeave = leaveRequestService.requestLeave(leaveRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("id", savedLeave.getId());

        return response;
    }
}
