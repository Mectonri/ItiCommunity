import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Bad, Ok } from 'src/modules/common/Result';
import { UserQueries } from '../../services/user.queries';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})

export class UserRegistrationComponent implements OnInit {
  
  form: FormGroup;  

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private userQueries : UserQueries,
    private nzMessageService: NzMessageService
  ) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      pwdVal: ["", [Validators.required, this.confirmationValidator]]
    });
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true };
    }
    return {};
  }
  


  async submit() : Promise<void> {
    if (await this.userQueries.exists(this.form.get("username")!.value)) {
      this.nzMessageService.error("Username already used. Please pick another")
    } 
    if ((await this.register()).success) {
      this.goToLogin();
    } 
  }

  async register(): Promise<Bad <"register failed"> | Ok> {
    try {
      const rep = await this.userService.register(
        this.form.get("username")!.value,
        this.form.get("password")!.value
      );
      return Ok();
    } catch(e) {
      return Bad("register failed");
    }
  }

  goToLogin() {
    this.router.navigate(["/splash/login"]);
  }
}
