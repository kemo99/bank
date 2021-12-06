import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { History } from '../model/account';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-balance-account',
  templateUrl: './balance-account.component.html',
  styleUrls: ['./balance-account.component.scss']
})
export class BalanceAccountComponent implements OnInit {

  displayedColumns = ['date', 'operation', 'amount'];
  dataSource: History[] = [];
  balance: number = -1;
  searchAccountForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.maxLength(15)])
    });
  }

  searchAccountBalance(accountName: string): void {
   this.accountService.getAccount(accountName).subscribe(accounts => {
     if(accounts.length == 0) {
      this.dialog.open(DialogContentComponent, {
        data: { content: `${this.translateService.instant('balanceAccount.form.searchAccount')}` }
      });
     } else {
      accounts.forEach(data => {
        this.balance = data.balance;
        this.dataSource = data.history;
      });
    }  
    this.dataSource = [...this.dataSource];  //refresh the dataSource 
   });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.searchAccountForm.controls[controlName].hasError(errorName);
  }
}
