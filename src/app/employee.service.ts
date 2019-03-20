import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from './model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:3000/employee';

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  public getEmployeeId(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + '/' + id);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  public deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(this.baseUrl + '/' + employee.id);
  }

  public editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl + '/' + employee.id, employee);
  }
}
