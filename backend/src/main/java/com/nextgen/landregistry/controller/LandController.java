package com.nextgen.landregistry.controller;

import com.nextgen.landregistry.entity.LandRecord;
import com.nextgen.landregistry.repository.LandRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lands")
@CrossOrigin(origins = "http://localhost:3000") // <--- CRITICAL for Frontend access
public class LandController {

    private final LandRepository repository;

    public LandController(LandRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<LandRecord> getAllLands() {
        return repository.findAll();
    }

    @PostMapping
    public LandRecord createLand(@RequestBody LandRecord landRecord) {
        // In a real app, we would verify the user from a Token here.
        // For now, we accept the user ID sent from the frontend.
        landRecord.setStatus("PENDING");
        return repository.save(landRecord);
    }

    @PutMapping("/{id}/approve")
    public LandRecord approveLand(@PathVariable Long id) {
        return repository.findById(id).map(land -> {
            land.setStatus("APPROVED");
            return repository.save(land);
        }).orElseThrow(() -> new RuntimeException("Land not found"));
    }

    // DELETE: Delete a Land Record (Optional utility)
    @DeleteMapping("/{id}")
    public void deleteLand(@PathVariable Long id) {
        repository.deleteById(id);
    }

   // Reject a Land Record
    @PutMapping("/{id}/reject")
    public LandRecord rejectLand(@PathVariable Long id) {
        return repository.findById(id).map(land -> {
            land.setStatus("REJECTED");
            return repository.save(land);
        }).orElseThrow(() -> new RuntimeException("Land not found"));
    }

}