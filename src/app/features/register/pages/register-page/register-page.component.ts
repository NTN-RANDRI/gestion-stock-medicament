import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterService } from '../../services/register.service';
import { registerModel } from '../../models/register.model';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnDestroy {
  private registerSubscription: Subscription | null = null;

  private formBuilder = inject(FormBuilder);
  private registerService = inject(RegisterService);

  protected registerFormData = this.formBuilder.group({
    nom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]]
  })

  protected isInvalid(name: string) {
    return this.registerFormData.get(name)?.invalid && this.registerFormData.get(name)?.touched;
  }

  protected register(event: Event) {
    event.preventDefault();

    this.registerFormData.markAllAsTouched();

    if (this.registerFormData.valid) {
      this.registerSubscription = this.registerService.register(this.registerFormData.value as registerModel).subscribe({
        next: _ => {
          Swal.fire({
            title: "Demande envoyée !",
            text: "Votre demande de création de compte a bien été envoyée. Elle sera examinée par l’administrateur.",
            icon: "success",
            draggable: true
          });
        }
      });
      console.log(this.registerFormData.value);
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
