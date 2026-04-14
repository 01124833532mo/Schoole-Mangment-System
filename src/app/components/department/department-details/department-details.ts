import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../_services/department-service';

@Component({
  selector: 'app-department-details',
  imports: [FormsModule],
  template: `
    <p>department-details works!</p>
    <h1 class="alert alert-primary">
      {{dept().id}} - {{dept().name}} - {{dept().location}} - {{dept().studentsCount}}
    </h1>

    <div>
      <label>
        name
        <input type="text" [(ngModel)]="editDept.name">
      </label>
      <br>
      <label>
        location
        <input type="text" [(ngModel)]="editDept.location">
      </label>
      <br>
      <button (click)="updateDepartment()">Update</button>
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
export class DepartmentDetails implements OnInit, OnDestroy {
  deptService = inject(DepartmentService);
  activatedRoute = inject(ActivatedRoute);
  sub: Subscription | null = null;

  deptId = 0;
  dept = signal<IDepartment>({});
  editDept: IDepartment = {};

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(a => {
      this.deptId = Number(a['id']);
      this.deptService.getById(this.deptId).subscribe(d => {
        this.dept.set(d);
        this.editDept = { ...d };
      });
    });
  }

  updateDepartment() {
    const id = this.editDept.id ?? this.deptId;
    if (!id) {
      return;
    }
    this.deptService.update(id, this.editDept).subscribe(() => {
      this.dept.set({ ...this.editDept, id });
      this.editDept = { ...this.editDept, id };
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
