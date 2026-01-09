package com.ferilion.employeemanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long empId;
    private String action;
    private LocalDateTime timestamp;
    private Double latitude;
    private Double longitude;
    private String status;
}
