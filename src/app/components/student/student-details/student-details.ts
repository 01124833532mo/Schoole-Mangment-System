import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { IStudent } from '../../../models/i-student';
import { StudentService } from '../../../_services/student-service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  imports: [FormsModule],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetails implements OnInit,OnDestroy
 {
  ngOnDestroy(): void {
   this.sub?.unsubscribe();
  }


 stdService=inject(StudentService)
 activtedRoute=inject(ActivatedRoute);

 sub:Subscription|null=null;
  studentId = 0;
  editStudent: IStudent = {};

  ngOnInit(): void {
    this.sub= this.activtedRoute.params.subscribe(a=>{
      this.studentId = Number(a['id']);
      this.stdService.getById(this.studentId).subscribe(d=>{
        this.std.set(d);
        this.editStudent = { ...d };
      })
    })
  }
  std=signal<IStudent>({});

  updateStudent() {
    const id = this.editStudent.id ?? this.studentId;
    if (!id) {
      return;
    }
    this.stdService.update(id, this.editStudent).subscribe(() => {
      this.std.set({ ...this.editStudent, id });
      this.editStudent = { ...this.editStudent, id };
    });
  }


}
