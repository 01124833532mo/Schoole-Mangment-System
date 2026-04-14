import { inject, Injectable } from '@angular/core';
import { IStudent } from '../models/i-student';
import { HttpClient } from '@angular/common/http';


@Injectable(
  {
  providedIn:'root',
}
)
export class StudentService {
  http=inject(HttpClient)
  private baseurl="https://localhost:7073/api/students/";

  getAll(params?: { search?: string; pageNumber?: number; pageSize?: number }){
    return this.http.get<{ pageNumber: number; pageSize: number; totalCount: number; items: IStudent[] }>(this.baseurl, { params });
  }

  Add(std:IStudent){
    const payload: IStudent = {
      name: std.name,
      age: std.age,
      address: std.address,
      departmentId: std.departmentId,
    };
    return this.http.post<IStudent>(this.baseurl, payload);
  }

  getById(id:number){
    return this.http.get<IStudent>(this.baseurl+id);
  }

  update(id: number, std: IStudent){
    return this.http.put(this.baseurl+id,std);
  }

  delete(id:number){
    return this.http.delete(this.baseurl+id);
  }
}
