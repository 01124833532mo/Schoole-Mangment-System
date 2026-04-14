import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICourse } from '../models/i-course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseurl = 'https://localhost:7073/api/course/';
  http = inject(HttpClient);

  getAll() {
    return this.http.get<ICourse[]>(this.baseurl);
  }

  getById(id: number) {
    return this.http.get<ICourse>(this.baseurl + id);
  }

  add(course: ICourse) {
    return this.http.post<ICourse>(this.baseurl, course);
  }

  update(id: number, course: ICourse) {
    return this.http.put(this.baseurl + id, course);
  }

  delete(id: number) {
    return this.http.delete(this.baseurl + id);
  }

  getByName(name: string) {
    return this.http.get<ICourse[]>(this.baseurl + 'byname/' + encodeURIComponent(name));
  }

  assignDepartment(courseId: number, departmentId: number) {
    return this.http.patch<ICourse>(this.baseurl + courseId + '/department/' + departmentId, {});
  }

  removeDepartment(courseId: number) {
    return this.http.delete(this.baseurl + courseId + '/department');
  }
}
