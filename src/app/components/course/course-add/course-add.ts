import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ICourse } from '../../../models/i-course';
import { CourseService } from '../../../_services/course-service';

@Component({
  selector: 'app-course-add',
  imports: [FormsModule],
  templateUrl: './course-add.html',
  styleUrl: './course-add.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseAdd {
  course: ICourse = {};
  errorMessage = signal('');
  courseService = inject(CourseService);
  router = inject(Router);

  save() {
    this.errorMessage.set('');
    const payload: ICourse = {
      ...this.course,
      duration: this.toNumber(this.course.duration),
      topId: this.toNumber(this.course.topId),
    };
    this.courseService.add(payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/courses');
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.title ?? err.error ?? 'Add course failed.';
        this.errorMessage.set(typeof message === 'string' ? message : 'Add course failed.');
      },
    });
  }

  private toNumber(value: number | string | undefined): number | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  }
}
