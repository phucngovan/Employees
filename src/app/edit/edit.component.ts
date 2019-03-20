import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService) { }
  editForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)')
    ]),
    birthday: new FormControl(''),
    gender: new FormControl('')
  });

  ngOnInit() {
    const employeeId = localStorage.getItem('editEmployeeId');
    if (!employeeId) {
      alert('Invalid action.');
      this.router.navigate(['list-employee']);
      return;
    }
    this.employeeService.getEmployeeId(employeeId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }
  onSubmit() {
    this.employeeService.editEmployee(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-employee']);
        },
        error => {
          alert(error);
        });
  }

}
