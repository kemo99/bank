import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.component.html',
  styleUrls: ['./withdraw-account.component.scss']
})
export class WithdrawAccountComponent implements OnInit {

  withdrawAccountForm!: FormGroup;
  
  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
    ) { }

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
    let message = "";
    let success = this.accountService.operation(account.accountName, +account.amount, Operation.WITHDRAW);
    if (success) {
      message = `${account.amount} € is withdrawded on your account`;
      //alert(`${account.amount} € is withdrawded on your account`);
      this.withdrawAccountForm.reset();
    } else {
      message = 'Check your account name or your balance';
      //alert('Check your account name or your balance');
    }

    this.dialog.open(DialogContentComponent, {
      data: { content: message }
    });
  }

}
