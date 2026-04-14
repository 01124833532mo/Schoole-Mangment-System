import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../_services/department-service';

@Component({
  selector: 'app-department-add',
  imports: [FormsModule],
  templateUrl: './department-add.html',
  styleUrl: './department-add.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentAdd {
  dept: IDepartment = {};
  errorMessage = signal('');
  deptService = inject(DepartmentService);
  router = inject(Router);

  save() {
    this.errorMessage.set('');
    this.deptService.add(this.dept).subscribe({
      next: () => {
        this.router.navigateByUrl('/departments');
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.title ?? err.error ?? 'Add department failed.';
        this.errorMessage.set(typeof message === 'string' ? message : 'Add department failed.');
      },
    });
  }
}
