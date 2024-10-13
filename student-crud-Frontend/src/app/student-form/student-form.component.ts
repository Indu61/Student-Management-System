// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { StudentService } from '../student.service';

// @Component({
//   selector: 'app-student-form',
//   templateUrl: './student-form.component.html',
//   styleUrls: ['./student-form.component.scss']
// })
// export class StudentFormComponent {
  
//   newStudent = {
//     name: '',
//     branch: '',
//     rollNo: '',
//     email: ''
//   };



//   constructor(private http: HttpClient) {}

//   addStudent() {
//     if (!this.newStudent.name || !this.newStudent.branch || !this.newStudent.rollNo || !this.newStudent.email) {
//       alert('Please fill all fields');
//       return;
//     }

//     this.http.post<any>('http://localhost:8080/students', this.newStudent)
//       .subscribe(() => {
//         alert('Student added successfully');
//         this.clearForm();
//       }, error => {
//         console.error('Error adding student:', error);
//         alert('Failed to add student');
//       });
//   }

//   clearForm() {
//     this.newStudent = {
//       name: '',
//       branch: '',
//       rollNo: '',
//       email: ''
//     };
//   }
// }

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { StudentService } from '../student.service';

// @Component({
//   selector: 'app-student-form',
//   templateUrl: './student-form.component.html',
//   styleUrls: ['./student-form.component.scss']
// })
// export class StudentFormComponent {
  
//   newStudent = {
//     name: '',
//     branch: '',
//     rollNo: '',
//     email: ''
//   };

//   constructor(private http: HttpClient, public studentService: StudentService) {}  // Made studentService public

//   addStudent() {
//     if (!this.newStudent.name || !this.newStudent.branch || !this.newStudent.rollNo || !this.newStudent.email) {
//       alert('Please fill all fields');
//       return;
//     }

//     this.http.post<any>('http://localhost:8080/students', this.newStudent)
//       .subscribe(() => {
//         alert('Student added successfully');
//         this.studentService.addStudent(this.newStudent); // Add student to the service
//         this.clearForm();
//       }, error => {
//         console.error('Error adding student:', error);
//         alert('Failed to add student');
//       });
//   }

//   clearForm() {
//     this.newStudent = {
//       name: '',
//       branch: '',
//       rollNo: '',
//       email: ''
//     };
//   }

//   // removeStudent(index: number) {
//   //   this.studentService.removeStudent(index);
//   // }
//   removeStudent(id: number, index: number) {
//     this.http.delete<any>(`http://localhost:8080/students/${id}`)
//       .subscribe(() => {
//         alert('Student removed successfully');
//         this.studentService.removeStudent(index); // Remove student from the service
//       }, error => {
//         console.error('Error removing student:', error);
//         alert('Failed to remove student');
//       });
//   }

//   viewStudent(student: any) {
//     alert(`Student Details:\nName: ${student.name}\nBranch: ${student.branch}\nRoll No: ${student.rollNo}\nEmail: ${student.email}`);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { StudentService } from '../student.service';

// @Component({
//   selector: 'app-student-form',
//   templateUrl: './student-form.component.html',
//   styleUrls: ['./student-form.component.scss']
// })
// export class StudentFormComponent implements OnInit {

//   newStudent = {
//     name: '',
//     branch: '',
//     rollNo: '',
//     email: ''
//   };

//   students: any[] = [];
//   isEditing = false;

//   constructor(private http: HttpClient, public studentService: StudentService) {} // Make studentService public

//   ngOnInit() {
//     this.http.get<any[]>('http://localhost:8080/students')
//       .subscribe(students => {
//         this.studentService.setStudents(students);
//       }, error => {
//         console.error('Error fetching students:', error);
//         alert('Failed to fetch students');
//       });
//   }

//   addStudent() {
//     if (!this.newStudent.name || !this.newStudent.branch || !this.newStudent.rollNo || !this.newStudent.email) {
//       alert('Please fill all fields');
//       return;
//     }

//     this.http.post<any>('http://localhost:8080/students', this.newStudent)
//       .subscribe((addedStudent) => {
//         alert('Student added successfully');
//         this.studentService.addStudent(addedStudent); // Use the returned student from the backend
//         this.clearForm();
//       }, error => {
//         console.error('Error adding student:', error);
//         alert('Failed to add student');
//       });
//   }

//   clearForm() {
//     this.newStudent = {
//       name: '',
//       branch: '',
//       rollNo: '',
//       email: ''
//     };
//   }

//   removeStudent(id: number, index: number) {
//     this.http.delete<any>(`http://localhost:8080/students/${id}`)
//       .subscribe(() => {
//         alert('Student removed successfully');
//         this.studentService.removeStudent(index); // Remove student from the service
//       }, error => {
//         console.error('Error removing student:', error);
//         alert('Failed to remove student');
//       });
//   }

//   viewStudent(student: any) {
//     this.newStudent = { ...student }; // Populate the form with the selected student's data
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StudentService } from '../student.service';

interface BranchInfo {
  branch: string;
  branchName: string;
}

interface BranchOption   {
  label: string;
  value: string;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  newStudent = {
    id: null,
    name: '',
    branch: '',// id 
    rollNo: '',
    email: ''
  };


  students: any[] = [];
  isEditing = false;
  branchOptions: BranchOption[] = [];

  constructor(private http: HttpClient, public studentService: StudentService) {
  }

  ngOnInit() {
    this.fetchStudents();
    // this.branchOptions = [
    //   { label: "CSE", value: "1" },
    //   { label: "IT", value: "2" },
    //   { label: "ENTC", value: "3" },
    //   { label: "MECH", value: "4" },
    //   { label: "CIVIL", value: "5" },
    //   { label: "ELECTICAL", value: "6" }
    // ];
    this.fetchBranchOptions();
  }

  fetchStudents() {
    this.http.get<any[]>('http://localhost:8080/students')
      .subscribe(
        students => {
          this.studentService.setStudents(students);
          this.students = students; // Update local students array
        },
        error => {
          console.error('Error fetching students:', error);
          
        }
      );
  }

  fetchBranchOptions() {
    this.http.get<BranchInfo[]>('http://localhost:8080/branches')
      .subscribe(
        (branches: BranchInfo[]) => {
          this.branchOptions = branches.map(branch => ({
            label: branch.branchName,
            value: branch.branch
          }));
        },
        (error) => {
          console.error('Error fetching branch options:', error);
        }
      );
  }

  onSubmit() {
    if (this.isEditing==true) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  }

  addStudent() {
    if (!this.newStudent.name || !this.newStudent.branch || !this.newStudent.rollNo || !this.newStudent.email) {
      console.log("Form is invalid, cannot submit.");
      return;
    }
  
    // Find the selected branch value
    const selectedBranch = this.branchOptions.find(b => b.value === this.newStudent.branch);
    if (!selectedBranch) {
      console.error("Selected branch not found in branchOptions");
      return;
    }
  
    console.log("Submitting student:", this.newStudent);

    // Set the branch value as expected by backend
    this.newStudent.branch = selectedBranch.value;
    console.log( selectedBranch.value)
  
    this.http.post<any>('http://localhost:8080/students', this.newStudent)
      .subscribe(
        (addedStudent: any) => {
          console.log("Student added successfully:", addedStudent);
          this.students.push(addedStudent); // Update local students array
          this.clearForm();
        },
        error => {
          console.error('Error adding student:', error);
          if (error instanceof HttpErrorResponse) {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          } else {
            console.error('An unexpected error occurred:', error.message);
          }
          // Handle specific errors as needed (e.g., show user-friendly message)
        }
      );
  }
  

  updateStudent() {
    // console.log("hiiii")
    if (this.newStudent.id === null) {
      
      return;
    }
    this.http.put<any>(`http://localhost:8080/students/${this.newStudent.id}`, this.newStudent)
      .subscribe(
        updatedStudent => {
          
          console.log("hi");
          const index = this.students.findIndex(s => s.id === updatedStudent.id);
          if (index !== -1) {
            this.students[index] = updatedStudent; // Update the existing student object
            console.log("Upadte");
          }
          this.clearForm();
          this.isEditing = false; // Reset editing mode
        },
        error => {
          console.error('Error updating student:', error);
          
        }
      );
  }
  
clearForm() {
    this.newStudent = {
      id: null,
      name: '',
      branch: '',
      rollNo: '',
      email: ''
    };
    this.isEditing = false;
  }

  removeStudent(id: number, index: number) {
    this.http.delete<any>(`http://localhost:8080/students/${id}`)
      .subscribe(
        () => {
          
          this.studentService.removeStudent(index); // Update local students array
        },
        error => {
          console.error('Error removing student:', error);
        
        }
      );
  }

  viewStudent(student: any) {
    this.newStudent = { ...student };
    this.isEditing = true
      
  }
}
