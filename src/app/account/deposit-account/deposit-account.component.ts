import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-deposit-account',
  templateUrl: './deposit-account.component.html',
  styleUrls: ['./deposit-account.component.scss']
})
export class DepositAccountComponent implements OnInit {

  accountName!: FormControl;
  amount!: FormControl;
  createAccountForm!: FormGroup;
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      amount: new FormControl('', [Validators.required])
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.createAccountForm.controls[controlName].hasError(errorName);
  }

  makeDeposit(account: any): void {
    let isAmountAdded = false;
    isAmountAdded = this.accountService.addAmount(account.accountName, +account.amount);
    isAmountAdded ? alert(`${account.amount} is added`) : alert(`${account.amount} not added`);
  }

}
