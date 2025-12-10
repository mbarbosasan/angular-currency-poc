import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

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
    return of([
        {
          "id": 1,
          "amount": 100,
          "currency": "MXN",
          "date": "2021-01-01"
        },
        {
          "id": 2,
          "amount": 200,
          "currency": "BRL",
          "date": "2021-01-02"
        }
      ])
  }
}
