import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorSpanComponent } from '../../components/error-span/error-span.component';
import { ButtonComponent } from '../../components/button/button.component';
import { UsersService } from '../../core/services/users.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorSpanComponent, RouterModule, ButtonComponent, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  error?: boolean = false;
  message?: string = '';
  constructor(private fb: FormBuilder, private usersService: UsersService) {
  }

  get username() { return this.userForm.get('username') as FormControl }
  get password() { return this.userForm.get('password') as FormControl }

  userForm = this.fb.group({
    'username': ['', [Validators.required]],
    'password': ['', Validators.required],
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.usersService.loginUser(this.userForm.value).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          // localStorage.setItem('userId', data.userId);
          // localStorage.setItem('userRole', data.userRole);
          localStorage.setItem('username', data.username);
          localStorage.setItem('logged', 'true');
          window.location.href = '/';
        },
        error: (error) => {
          this.error = true;
          this.message = error;
          console.log(error);
        }
      });
    } else {
      this.message = 'Los campos no son válidos, revisa los datos ingresados.';
    }
  }
}