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
  submitted = false;
  editForm: FormGroup;
  get f() { return this.editForm.controls; }

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService) { }
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)')]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    })
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
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
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
