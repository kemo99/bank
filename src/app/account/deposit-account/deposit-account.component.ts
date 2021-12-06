import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deposit-account',
  templateUrl: './deposit-account.component.html',
  styleUrls: ['./deposit-account.component.scss']
})
export class DepositAccountComponent implements OnInit {

  depositAccountForm!: FormGroup;
  @ViewChild(FormGroupDirective) myForm;
  
  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
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
    this.accountService.operation(account.accountName, +account.amount, Operation.DEPOSIT)
    .subscribe(isDone => {
      if (isDone) {
        message = `${account.amount} ${this.translateService.instant('depositAccount.form.isAdded')}`;
        this.resetForm();
       } else {
         message = `${this.translateService.instant('depositAccount.form.notAdded')}`;
       }
    });
    
     this.dialog.open(DialogContentComponent, {
       data: { content: message }
     })
  }

  resetForm() {
    if (this.myForm) {
      this.myForm.resetForm();
    }
  }

}
