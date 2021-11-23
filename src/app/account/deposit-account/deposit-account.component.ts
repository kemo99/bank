import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-deposit-account',
  templateUrl: './deposit-account.component.html',
  styleUrls: ['./deposit-account.component.scss']
})
export class DepositAccountComponent implements OnInit {

  depositAccountForm!: FormGroup;
  
  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.depositAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      amount: new FormControl('', [Validators.required])
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.depositAccountForm.controls[controlName].hasError(errorName);
  }

  makeDeposit(account: { accountName: string, amount: string }): void {
    let message = "";
    let success = this.accountService.operation(account.accountName, +account.amount, Operation.DEPOSIT);
    if (success) {
      message = `${account.amount} € is added on your account`;
      //alert(`${account.amount} € is added on your account`);
      this.depositAccountForm.reset();
     } else {
       message = 'This account name does not exist';
      //alert('This account name does not exist');
     }

     this.dialog.open(DialogContentComponent, {
       data: { content: message }
     })
  }

}
