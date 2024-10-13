package com.example.studentcrud;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BranchInfoRepository branchInfoRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @PostMapping
    // public Student createStudent(@RequestBody Student student) {
    //     return studentRepository.save(student);
    // }
    // @PostMapping
    // public ResponseEntity<Student> addStudent(@RequestBody Student student) {
    //     Student savedStudent = studentRepository.save(student);
    //     return ResponseEntity.ok(savedStudent);
    // }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        // Fetch BranchInfo from repository based on branch name (assuming branchInfo is uniquely identified by branch name)
        Optional<BranchInfo> branchInfoOptional = branchInfoRepository.findById(student.getBranch());

        if (branchInfoOptional.isPresent()) {
            BranchInfo branchInfo = branchInfoOptional.get();
            student.setBranchInfo(branchInfo); // Set the fetched BranchInfo to Student
            Student savedStudent = studentRepository.save(student);
            return ResponseEntity.ok(savedStudent);
        } else {
            return ResponseEntity.badRequest().build(); // Handle branch not found scenario
        }
    }

@PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(id);

        if (studentOptional.isPresent()) {
            Student existingStudent = studentOptional.get();

            // Update fields from studentDetails
            existingStudent.setName(studentDetails.getName());
            existingStudent.setRollNo(studentDetails.getRollNo());
            existingStudent.setEmail(studentDetails.getEmail());

            // Fetch BranchInfo from repository based on branch name (assuming branchInfo is uniquely identified by branch name)
            Optional<BranchInfo> branchInfoOptional = branchInfoRepository.findById(studentDetails.getBranch());

            if (branchInfoOptional.isPresent()) {
                BranchInfo branchInfo = branchInfoOptional.get();
                existingStudent.setBranchInfo(branchInfo); // Set the fetched BranchInfo to existing Student
                Student updatedStudent = studentRepository.save(existingStudent);
                return ResponseEntity.ok(updatedStudent);
            } else {
                return ResponseEntity.badRequest().build(); // Handle branch not found scenario
            }
        } else {
            return ResponseEntity.notFound().build(); // Handle student not found scenario
        }
    }

    // Other methods for fetching students, deleting students, etc.



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            studentRepository.delete(student.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

