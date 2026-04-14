import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { IStudent } from '../../../models/i-student';

import { StudentService } from '../../../_services/student-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-list',
  imports: [RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
 // providers:[{provide:StudentService,useClass:StudentService}]
})
export class StudentList implements OnInit
{

  ngOnInit(): void {
    this.loadPage();

  }

  students=signal<IStudent[]>([]);
  pageNumber=signal(1);
  pageSize=signal(10);
  totalCount=signal(0);
  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.totalCount() / this.pageSize()));
  });
  stdService=inject(StudentService);

  loadPage(){
    this.stdService.getAll({
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    }).subscribe({
      next: d => {
        this.students.set(d.items);
        this.totalCount.set(d.totalCount);
      }
    });
  }

  nextPage(){
    const next = this.pageNumber() + 1;
    if (next <= this.totalPages()) {
      this.pageNumber.set(next);
      this.loadPage();
    }
  }

  prevPage(){
    const prev = this.pageNumber() - 1;
    if (prev >= 1) {
      this.pageNumber.set(prev);
      this.loadPage();
    }
  }

  setPageSize(size: number){
    if (!Number.isFinite(size) || size <= 0) {
      return;
    }
    this.pageSize.set(size);
    this.pageNumber.set(1);
    this.loadPage();
  }

  onPageSizeChange(value: string){
    this.setPageSize(Number(value));
  }

  deleteStudent(id: number | undefined) {
    if (!id) {
      return;
    }
    this.stdService.delete(id).subscribe(() => {
      this.students.update(items => items.filter(s => s.id !== id));
      this.totalCount.set(Math.max(0, this.totalCount() - 1));
    });
  }

}
