package com.example.studentcrud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/branches")
public class BranchInfoController {

    @Autowired
    private BranchInfoRepository branchInfoRepository;

    // GET all branches
    @GetMapping
    public List<BranchInfo> getAllBranches() {
        return branchInfoRepository.findAll();
    }

    // GET branch by branch name
    @GetMapping("/{branch}")
    public ResponseEntity<BranchInfo> getBranchByBranchName(@PathVariable String branch) {
        Optional<BranchInfo> branchInfo = branchInfoRepository.findById(branch);
        return branchInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST create a new branch
    @PostMapping
    public ResponseEntity<BranchInfo> createBranch(@RequestBody BranchInfo branchInfo) {
        try {
            BranchInfo newBranch = branchInfoRepository.save(branchInfo);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBranch);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT update an existing branch
    @PutMapping("/{branch}")
    public ResponseEntity<BranchInfo> updateBranch(@PathVariable String branch, @RequestBody BranchInfo branchInfo) {
        Optional<BranchInfo> existingBranchOptional = branchInfoRepository.findById(branch);
        if (existingBranchOptional.isPresent()) {
            BranchInfo existingBranch = existingBranchOptional.get();
            existingBranch.setBranchName(branchInfo.getBranchName());
            BranchInfo updatedBranch = branchInfoRepository.save(existingBranch);
            return ResponseEntity.ok(updatedBranch);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE delete a branch by branch name
    @DeleteMapping("/{branch}")
    public ResponseEntity<Void> deleteBranch(@PathVariable String branch) {
        try {
            branchInfoRepository.deleteById(branch);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
