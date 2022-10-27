import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userQueries : UserQueries
  ) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required/** , this.usernameAvailableValidator*/]],
      password: ["", [Validators.required]],
      pwdVal: ["", [Validators.required, this.confirmationValidator]]
    });
  }

  usernameAvailableValidator = async (control: UntypedFormControl): Promise<{ [s: string]: boolean; }> => {
    if (!control.value) {
      return { required: true };
    } else if (await this.userQueries.exists(control.value)) {
      return { taken: true };
    }
    return {};
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
