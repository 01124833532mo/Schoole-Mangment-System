import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICourse } from '../../../models/i-course';
import { CourseService } from '../../../_services/course-service';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseList implements OnInit {
  courses = signal<ICourse[]>([]);
  courseService = inject(CourseService);

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.courseService.getAll().subscribe({
      next: d => this.courses.set(d),
    });
  }

  deleteCourse(id: number | undefined) {
    if (!id) {
      return;
    }
    this.courseService.delete(id).subscribe(() => {
      this.courses.update(items => items.filter(c => c.id !== id));
    });
  }
}
