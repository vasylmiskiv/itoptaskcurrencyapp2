import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  currencyOptions = ['UAH', 'USD', 'EUR', 'CAD', 'GBP'];

  firstCurrency: string = 'UAH';
  secondCurrency: string = 'UAH';

  difference!: number;

  amount: string = '1';

  amountFromCurrency: boolean = true;

  firstAmount?: string;
  secondAmount?: string;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getDifference();
  }

  isAmountFromCurrency() {
    if (this.amountFromCurrency) {
      this.firstAmount = this.amount;
      this.secondAmount = (Number(this.amount) * this.difference).toFixed(2);
    } else {
      this.secondAmount = this.amount;
      this.firstAmount = (Number(this.amount) / this.difference).toFixed(2);
    }
  }

  getDifference() {
    this.currencyService
      .getDifference(this.firstCurrency)
      .subscribe((res: any) => {
        this.difference = res.rates[this.secondCurrency];
        this.isAmountFromCurrency();
      });
  }

  onFirstAmount() {
    this.amountFromCurrency = true;
    this.secondAmount = (
      Number(this.firstAmount) * Number(this.difference)
    ).toFixed(2);
    console.log(this.firstCurrency);
  }

  onSecondAmount() {
    this.amountFromCurrency = false;
    this.firstAmount = (
      Number(this.secondAmount) / Number(this.difference)
    ).toFixed(2);
  }

  firstCurrencyOnChange(e: any) {
    this.firstCurrency = e.target.value;
    this.getDifference();
  }

  secondCurrencyOnChange(e: any) {
    this.secondCurrency = e.target.value;
    this.getDifference();
  }
}
