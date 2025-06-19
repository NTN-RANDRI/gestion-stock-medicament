import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '@/app/features/login/services/login.service';
import { Subscription } from 'rxjs';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnDestroy {
  private loginSubscription: Subscription | null = null;
  protected invalidCredentials: boolean = false;

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);

  protected loginFormData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required]]
  });

  protected isInvalid(name: string) {
    return this.loginFormData.get(name)?.invalid && this.loginFormData.get(name)?.touched;
  }

  protected login (event: Event) {
    event.preventDefault();

    this.loginFormData.markAllAsTouched();

    if (this.loginFormData.valid) {
      this.loginSubscription = this.loginService.login(this.loginFormData.value as LoginModel).subscribe({
        next: _ => {
          alert('connected...')
        },
        error: error => {
          if(error.status === 400) {
            this.invalidCredentials = true;
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
