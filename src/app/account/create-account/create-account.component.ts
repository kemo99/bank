import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm!: FormGroup;
  @ViewChild(FormGroupDirective) myForm;
  
  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.maxLength(15)])
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.createAccountForm.controls[controlName].hasError(errorName);
  }

  createAccount(accountName: string): void {
    let message = "";
    this.accountService.createAccount(accountName).subscribe(isAdded => {
      if (isAdded) {
        message = `${accountName} ${this.translateService.instant('createAccount.form.isAdded')}`;
      } else {
        message = `${accountName} ${this.translateService.instant('createAccount.form.notAdded')}`;
      }
    });
    this.dialog.open(DialogContentComponent, {
      data: { content: message}
    });
    this.resetForm();
  }

  resetForm() {
    if (this.myForm) {
      this.myForm.resetForm();
    }
  }
}
