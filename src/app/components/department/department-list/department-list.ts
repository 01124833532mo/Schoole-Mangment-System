import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../_services/department-service';

@Component({
  selector: 'app-department-list',
  imports: [RouterLink],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentList implements OnInit {
  departments = signal<IDepartment[]>([]);
  deptService = inject(DepartmentService);

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.deptService.getAll().subscribe({
      next: d => this.departments.set(d),
    });
  }

  deleteDepartment(id: number | undefined) {
    if (!id) {
      return;
    }
    this.deptService.delete(id).subscribe(() => {
      this.departments.update(items => items.filter(dep => dep.id !== id));
    });
  }
}
