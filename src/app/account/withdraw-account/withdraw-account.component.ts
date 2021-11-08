import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.component.html',
  styleUrls: ['./withdraw-account.component.scss']
})
export class WithdrawAccountComponent implements OnInit {

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

  withdrawAmount(account: any): void {
    let isAmountAdded = false;
    isAmountAdded = this.accountService.withdrawAmount(account.accountName, +account.amount);
    isAmountAdded ? alert(`${account.amount} is withdrawded`) : alert('you do not have anough money in your balance');
  }

}
