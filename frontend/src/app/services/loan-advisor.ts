import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoanRequest {
  loanAmount: number;
  purpose: string;
  monthlyIncome: number;
  existingEMI: number;
  preferredTenure: number;
  employmentType: string;
  riskProfile: string;
}

export interface Product {
  id: string;
  name: string;
  annualRate: number;
}

export interface LoanCalculation {
  emi: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface LoanResponse {
  eligible: boolean;
  recommendedProduct?: Product;
  calculation?: LoanCalculation;
  eligibleProducts?: Product[];
  advisorMessage?: string;
  message?: string;
  disclaimer: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanAdvisorService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/api/advisor/recommend';

  recommend(request: LoanRequest): Observable<LoanResponse> {
    return this.http.post<LoanResponse>(
      this.apiUrl,
      request
    );
  }
}