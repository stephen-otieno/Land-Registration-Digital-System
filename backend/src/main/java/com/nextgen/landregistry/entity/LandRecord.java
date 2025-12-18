package com.nextgen.landregistry.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class LandRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerName;
    private String titleDeedNumber;
    private String location;
    private Double size;
    private String status; // PENDING, APPROVED, REJECTED
    private LocalDate registrationDate = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User applicant;

    // We will keep County simple for now
    private String county;
}