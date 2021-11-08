import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    let result: {
      isWithdrawed: boolean;
      balance: number;
    };
    result = this.accountService.withdrawAmount(account.accountName, +account.amount);
    result.isWithdrawed ? alert(`${account.amount} € is withdrawded on your account`) 
                        : result.balance < 0 ? alert('This account name does not exist')
                                             : alert(`You do not have enough money in your balance. Check your balance`);

    // reset the form field
    this.withdrawAccountForm.reset();
  }

}
