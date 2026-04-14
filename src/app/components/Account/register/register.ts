import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountServic } from '../../../_services/account-servic';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private fb = inject(FormBuilder);
  accSer = inject(AccountServic);
  router = inject(Router);
  errorMessage = signal('');

  registerForm = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  save() {
    this.errorMessage.set('');
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.accSer.register(this.registerForm.getRawValue()).subscribe({
      next: d => {
        this.accSer.addToken(d.token);
        this.router.navigateByUrl('/home');
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.title ?? err.error ?? 'Register failed.';
        this.errorMessage.set(typeof message === 'string' ? message : 'Register failed.');
      },
    });
  }

}
