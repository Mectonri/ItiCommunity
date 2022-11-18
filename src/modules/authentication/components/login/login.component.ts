import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  goToRegistration() {
    this.router.navigate(["/splash/register"]);
  }

  submit() {
    this.login();
  }

  async login() {
    if (this.form.invalid) {
      return;
    }

    try {
      let response = await this.authService.authenticate(this.form.get("username")!.value, this.form.get("password")!.value);
      console.log("response status :"+response.success);
      if(response.success){
        console.log("before router");
        this.router.navigate(["/"]);
      }
      else{
        this.nzMessageService.error("Invalid Credentials");
      }

    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }

  confirmUservalidator = async (control: UntypedFormControl): Promise<{ [s: string]: boolean; }> => {
    if (!control.value) {
      return { required: true };
    } 
    return {};
  }

  confirmPasswordvalidator = async (control: UntypedFormControl): Promise<{ [s: string]: boolean; }> => {
    if (!control.value) {
      return { required: true };
    } 
    return {};
  }
}
