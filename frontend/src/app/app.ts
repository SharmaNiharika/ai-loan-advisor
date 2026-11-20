import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  LoanAdvisorService,
  LoanResponse
} from './services/loan-advisor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly fb = inject(FormBuilder);
  private readonly loanAdvisorService = inject(LoanAdvisorService);

  loading = signal(false);
  errorMessage = signal('');
  result = signal<LoanResponse | null>(null);

  loanForm = this.fb.nonNullable.group({
    loanAmount: [
      500000,
      [Validators.required, Validators.min(1000)]
    ],

    purpose: [
      'HOME_RENOVATION',
      Validators.required
    ],

    monthlyIncome: [
      80000,
      [Validators.required, Validators.min(1)]
    ],

    existingEMI: [
      12000,
      [Validators.required, Validators.min(0)]
    ],

    preferredTenure: [
      36,
      [Validators.required, Validators.min(1)]
    ],

    employmentType: [
      'SALARIED',
      Validators.required
    ],

    riskProfile: [
      'MEDIUM',
      Validators.required
    ]
  });

  submit(): void {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.result.set(null);

    this.loanAdvisorService
      .recommend(this.loanForm.getRawValue())
      .subscribe({
        next: (response) => {
          this.result.set(response);
          this.loading.set(false);
        },

        error: (error) => {
          console.error(
            'Loan recommendation error:',
            error
          );

          this.errorMessage.set(
            error?.error?.error ||
            'Unable to generate a recommendation. Please try again.'
          );

          this.loading.set(false);
        }
      });
  }
}