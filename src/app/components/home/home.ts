import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IStudent } from '../../models/i-student';
import { StudentService } from '../../_services/student-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private studentService = inject(StudentService);
  students = signal<IStudent[]>([]);

  ngOnInit(): void {
    this.studentService.getAll({ pageNumber: 1, pageSize: 8 }).subscribe({
      next: d => this.students.set(d.items),
    });
  }
}
