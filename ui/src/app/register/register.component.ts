import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
  });

  get userName() {
    return this.registerForm.get('userName') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (!this.registerForm.valid) {
      return;
    }

    await this.authService.register(this.registerForm.value);
    this.router.navigate(['/']);
  }
}
