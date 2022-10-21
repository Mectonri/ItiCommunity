import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})

export class UserRegistrationComponent implements OnInit {
  
  form: FormGroup;
  validateForm!: UntypedFormGroup;

  model = new UserRegistrationFormModel();
  

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      pwdVal: ["", [Validators.required, this.confirmationValidator]]
    });
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }


  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.invalid || this.model.password !== this.model.confirmPassword) {
    }

    // TODO Enregistrer l'utilisateur via le UserService
    this.goToLogin();
    
  }

  goToLogin() {
    this.router.navigate(["/splash/login"]);
  }
}
