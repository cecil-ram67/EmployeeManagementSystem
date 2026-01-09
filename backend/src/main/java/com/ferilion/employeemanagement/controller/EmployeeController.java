package com.ferilion.employeemanagement.controller;

import com.ferilion.employeemanagement.model.Employee;
import com.ferilion.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*") // Allow all origins for dev simplicity
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Map<String, Object> createEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.createEmployee(employee);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Employee added successfully");

        Map<String, Object> data = new HashMap<>();
        data.put("id", savedEmployee.getId()); // Using DB ID
        response.put("data", data);

        return response;
    }
}
