import { Component, OnInit } from '@angular/core';
import {Employee} from '../model/Employee';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees: Employee[];

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployee().subscribe(data => { this.employees = data; });
  }
  deleteEmployees(employee: Employee): void {
    this.employeeService.deleteEmployee(employee)
      .subscribe( data => {
        this.employees = this.employees.filter(u => u !== employee);
      });
  }
  editEmployees(employee: Employee): void {
    localStorage.removeItem('editEmployeeId');
    localStorage.setItem('editEmployeeId', employee.id.toString());
    this.router.navigate(['edit-employee']);
  }

}
