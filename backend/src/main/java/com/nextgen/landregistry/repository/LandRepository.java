package com.nextgen.landregistry.repository;

import com.nextgen.landregistry.entity.LandRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LandRepository extends JpaRepository<LandRecord, Long> {
    // We can add custom queries here later if needed
}