import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.component.html',
  styleUrls: ['./withdraw-account.component.scss']
})
export class WithdrawAccountComponent implements OnInit {

  withdrawAccountForm!: FormGroup;
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.withdrawAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      amount: new FormControl('', [Validators.required])
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.withdrawAccountForm.controls[controlName].hasError(errorName);
  }

  withdrawAmount(account: { accountName: string, amount: string }): void {
    let success = this.accountService.operation(account.accountName, +account.amount, Operation.WITHDRAW);
    if (success) {
      alert(`${account.amount} € is withdrawded on your account`);
      this.withdrawAccountForm.reset();
    } else {
      alert('Check your account name or your balance');
    }
  }

}
