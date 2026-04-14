import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { IStudent } from '../../../models/i-student';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../_services/student-service';
import { Router } from '@angular/router';
import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../_services/department-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-add',
  imports: [FormsModule],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentAdd implements OnInit
{
  depts=signal<IDepartment[]>([]);
  errorMessage=signal('');
  deptSer=inject(DepartmentService);
  ngOnInit(): void {
    this.deptSer.getAll().subscribe(
      d=>{
        this.depts.set(d);
        if (!this.std.departmentId && d.length > 0) {
          this.std.departmentId = d[0].id;
        }
      }
    );
  }
  //constructor(public router:Router){}
  router=inject(Router);
  stdSer=inject(StudentService)
  std:IStudent={}
  save(){
    this.errorMessage.set('');
    const payload: IStudent = {
      ...this.std,
      age: this.toNumber(this.std.age),
      departmentId: this.toNumber(this.std.departmentId),
    };
    this.stdSer.Add(payload).subscribe({
      next: () => {
        this.router.navigateByUrl("/students");
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.title ?? err.error ?? 'Add student failed.';
        this.errorMessage.set(typeof message === 'string' ? message : 'Add student failed.');
      }
    })

  }

  private toNumber(value: number | string | undefined): number | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  }
}
