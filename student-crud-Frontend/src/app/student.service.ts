// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentService {
//   private students: any[] = [];

//   getStudents() {
//     return this.students;
//   }

//   setStudents(students: any[]) {
//     this.students = students;
//   }

//   addStudent(student: any) {
//     this.students.push(student);
//   }

  
//   removeStudent(index: number) {
//     this.students.splice(index, 1);
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: any[] = [];

  getStudents() {
    return this.students;
  }

  setStudents(students: any[]) {
    this.students = students;
  }

  // addStudent(student: any) {
  //   this.students.push(student);
  // }

  updateStudent(student: any) {
    console.log('Updating student:', student); // Add this line
    const index = this.students.findIndex(s => s.id === student.id);
    if (index!== -1) {
      this.students[index] = student;
    }
  }
  

  removeStudent(index: number) {
    this.students.splice(index, 1);
  }
}

