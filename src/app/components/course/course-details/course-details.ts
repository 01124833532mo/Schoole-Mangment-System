import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICourse } from '../../../models/i-course';
import { CourseService } from '../../../_services/course-service';
import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../_services/department-service';

@Component({
  selector: 'app-course-details',
  imports: [FormsModule],
  template: `
    <p>course-details works!</p>
    <h1 class="alert alert-primary">
      {{course().id}} - {{course().name}} - {{course().duration}} - {{course().topId}} - Dept: {{course().departmentId}} ({{course().department?.name || 'No Department'}}) - {{course().courseDesc}}
    </h1>

    <div>
      <label>
        name
        <input type="text" [(ngModel)]="editCourse.name">
      </label>
      <br>
      <label>
        duration
        <input type="number" [(ngModel)]="editCourse.duration">
      </label>
      <br>
      <label>
        topic id
        <input type="number" [(ngModel)]="editCourse.topId">
      </label>
      <br>
      <label>
        description
        <input type="text" [(ngModel)]="editCourse.courseDesc">
      </label>
      <br>
      <button (click)="updateCourse()">Update</button>
    </div>

    <hr>

    <div>
      <h5>Assign Department</h5>
      <label>
        Department
        <select [(ngModel)]="selectedDepartmentId">
          <option [ngValue]="undefined">Select Department</option>
          @for (item of departments(); track item.id) {
            <option [ngValue]="item.id">{{item.name}}</option>
          }
        </select>
      </label>
      <br>
      <button (click)="assignDepartment()">Assign Department</button>
      <button (click)="removeDepartment()">Remove Department</button>
      @if (assignMessage()) {
        <p>{{assignMessage()}}</p>
      }
    </div>
  `,
  styles: [
    `
      button {
        margin-top: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetails implements OnInit, OnDestroy {
  courseService = inject(CourseService);
  departmentService = inject(DepartmentService);
  activatedRoute = inject(ActivatedRoute);
  sub: Subscription | null = null;

  courseId = 0;
  course = signal<ICourse>({});
  departments = signal<IDepartment[]>([]);
  assignMessage = signal('');
  editCourse: ICourse = {};
  selectedDepartmentId?: number;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(a => {
      this.courseId = Number(a['id']);
      this.courseService.getById(this.courseId).subscribe(d => {
        this.course.set(d);
        this.editCourse = { ...d };
        this.selectedDepartmentId = d.departmentId ?? undefined;
      });
    });

    this.departmentService.getAll().subscribe(d => {
      this.departments.set(d);
    });
  }

  updateCourse() {
    const id = this.editCourse.id ?? this.courseId;
    if (!id) {
      return;
    }
    const payload: ICourse = {
      ...this.editCourse,
      duration: this.toNumber(this.editCourse.duration),
      topId: this.toNumber(this.editCourse.topId),
    };
    this.courseService.update(id, payload).subscribe(() => {
      this.course.set({ ...payload, id });
      this.editCourse = { ...payload, id };
    });
  }

  assignDepartment() {
    const courseId = this.editCourse.id ?? this.courseId;
    if (!courseId || !this.selectedDepartmentId) {
      this.assignMessage.set('Please select a department.');
      return;
    }

    this.courseService.assignDepartment(courseId, this.selectedDepartmentId).subscribe({
      next: data => {
        const selectedDept = this.departments().find(d => d.id === this.selectedDepartmentId);
        const updated = {
          ...this.course(),
          ...data,
          departmentId: this.selectedDepartmentId,
          department: selectedDept
            ? { id: selectedDept.id, name: selectedDept.name, loc: selectedDept.location }
            : data.department,
        };
        this.course.set(updated);
        this.editCourse = { ...this.editCourse, departmentId: this.selectedDepartmentId };
        this.assignMessage.set('Department assigned successfully.');
      },
      error: () => {
        this.assignMessage.set('Assign department failed.');
      },
    });
  }

  removeDepartment() {
    const courseId = this.editCourse.id ?? this.courseId;
    if (!courseId) {
      return;
    }

    this.courseService.removeDepartment(courseId).subscribe({
      next: () => {
        this.course.set({ ...this.course(), departmentId: null, department: null });
        this.editCourse = { ...this.editCourse, departmentId: null };
        this.selectedDepartmentId = undefined;
        this.assignMessage.set('Department removed successfully.');
      },
      error: () => {
        this.assignMessage.set('Remove department failed.');
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private toNumber(value: number | string | undefined): number | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  }
}
