import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Transaction = {
  id: number;
  amount: number;
  currency: string;
  date: string;
};

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly http = inject(HttpClient);

  getTransactions() {
    return this.http.get<Transaction[]>('http://localhost:3000/transactions');
  }
}
