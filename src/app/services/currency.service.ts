import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  requestUrl = 'https://api.exchangerate.host/latest';

  constructor(private http: HttpClient) {}

  getDifference(firstCurrency: string) {
    const response = `${this.requestUrl}?base=${firstCurrency}`;

    return this.http.get(response);
  }
}
