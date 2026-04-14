import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountServic } from '../../../_services/account-servic';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private fb = inject(FormBuilder);
  accSer = inject(AccountServic);
  router = inject(Router);
  errorMessage = signal('');

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    this.errorMessage.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.accSer.login(this.loginForm.getRawValue()).subscribe({
      next: d => {
        this.accSer.addToken(d.token);
        this.router.navigateByUrl('/home');
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.title ?? err.error ?? 'Login failed.';
        this.errorMessage.set(typeof message === 'string' ? message : 'Login failed.');
      },
    });
  }

}
