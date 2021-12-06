import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.component.html',
  styleUrls: ['./withdraw-account.component.scss']
})
export class WithdrawAccountComponent implements OnInit {

  withdrawAccountForm!: FormGroup;
  @ViewChild(FormGroupDirective) myForm;
  
  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
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
    this.accountService.operation(account.accountName, +account.amount, Operation.WITHDRAW)
    .subscribe(isDone => {
      if (isDone) {
        message = `${account.amount} ${this.translateService.instant('withdrawalAccount.form.isRetrieve')}`;
        this.resetForm();
      } else {
        message = `${this.translateService.instant('withdrawalAccount.form.notRetrieve')}`;
      }
    });

    this.dialog.open(DialogContentComponent, {
      data: { content: message }
    });
  }

  resetForm() {
    if (this.myForm) {
      this.myForm.resetForm();
    }
  }

}
