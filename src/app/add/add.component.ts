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
  addForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeService: EmployeeService) { }
  // addForm = new FormGroup({
  //   id: new FormControl(''),
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(4)
  //   ]),
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)')
  //   ]),
  //   birthday: new FormControl(''),
  //   gender: new FormControl('')
  // });
  get f() { return this.addForm.controls; }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern('^([\\w]*[\\w\\.]*(?!\\.)@gmail.com)')]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
      this.employeeService.addEmployee(this.addForm.value)
        .subscribe( data => {
          this.router.navigate(['list-employee']).then(function() {
               alert('tao thanh cong')
          })
        });
    }
}
