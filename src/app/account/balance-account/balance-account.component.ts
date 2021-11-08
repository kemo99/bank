import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../service/account.service';
import { History } from '../model/account';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-balance-account',
  templateUrl: './balance-account.component.html',
  styleUrls: ['./balance-account.component.scss']
})
export class BalanceAccountComponent implements OnInit {

  displayedColumns = ['date', 'operation', 'amount'];
  dataSource: History[] = [];
  balance: number = 0;
  searchAccountForm!: FormGroup;
  accountName!: FormControl;

  constructor(
    private accountService: AccountService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.searchAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required, Validators.maxLength(15)])
    });
  }

  searchAccountBalance(name: any): void {
    let account = this.accountService.checkBalance(name.accountName);
    account.forEach(data => {
        this.balance = data.balance;
        this.dataSource = data.history;
    });
    this.dataSource = [...this.dataSource];  //refresh the dataSource
  }

  hasError = (controlName: string, errorName: string) => {
    return this.searchAccountForm.controls[controlName].hasError(errorName);
  }
}
