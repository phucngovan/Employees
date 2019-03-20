import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService) { }
  addForm = new FormGroup({
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
  }
  onSubmit() {
      this.employeeService.addEmployee(this.addForm.value)
        .subscribe( data => {
          this.router.navigate(['list-employee']).then(function() {
               alert('tao thanh cong')
          })
        });
    }
}
