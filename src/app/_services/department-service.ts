import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDepartment } from '../models/idepartment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private baseurl="https://localhost:7073/api/Department/";
  http=inject(HttpClient);
  getAll(){
    return this.http.get<IDepartment[]>(this.baseurl);
  }

  getById(id: number){
    return this.http.get<IDepartment>(this.baseurl + id);
  }

  add(dept: IDepartment){
    return this.http.post<IDepartment>(this.baseurl, dept);
  }

  update(id: number, dept: IDepartment){
    return this.http.put(this.baseurl + id, dept);
  }

  delete(id: number){
    return this.http.delete(this.baseurl + id);
  }

}
