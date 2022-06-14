import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  mainCurrency = 'UAH';
  currencies = ['USD', 'EUR'];
  currencyRates: any = {};

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency = () => {
    for (let currency of this.currencies) {
      this.currencyService.getDifference(currency).subscribe((res: any) => {
        this.currencyRates[currency] = res.rates[this.mainCurrency].toFixed(2);
      });
    }
  };
}
