import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm!: FormGroup;
  
  constructor(
    private accountService: AccountService,
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
    let isAdded = false;
    let message = "";
    isAdded = this.accountService.createAccount(accountName);
    if (isAdded) {
      message = `${accountName} is added`;
    } else {
      message = `${accountName} already exist`;
    }
    //isAdded ? alert(`${accountName} is added`) : alert(`${accountName} already exist`);
    this.dialog.open(DialogContentComponent, {
      data: { content: message}
    });
    // reset the form field
    this.createAccountForm.reset();
  }

}
