import { Injectable } from '@angular/core';
import { Account, History, Operation } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[] = [];

  constructor() { }

  createAccount(accountName: string): boolean {
    let isAdded: boolean = false;
    if (!this.accountExist(accountName)) {
      this.accounts.push({
        name: accountName,
        balance: 0,
        history: []
      });
      isAdded = true;
    }
    return isAdded;
  }

  addAmount(accountName: string, amount: number): boolean {
    let result = false;
    this.accounts.forEach(account => {
      if (account.name === accountName) {
        account.balance += amount;
        let history: History = {
          operation: Operation.DEPOSIT,
          date: new Date(),
          amount: amount
        }
        account.history!.push(history);
        result = true;
      } 
    });
    return result;
  }

  withdrawAmount(accountName: string, amount: number): {
    isWithdrawed: boolean;
    balance: number;
  } {

    let isWithdrawed: boolean = false;
    let balance: number = -1;

    this.accounts.forEach(account => {
      if (account.name === accountName) {
        if (account.balance >= amount) {
          account.balance = account.balance - amount;
          let history: History = {
            operation: Operation.WITHDRAW,
            date: new Date(),
            amount: amount
          }
          account.history!.push(history);
          isWithdrawed = true;
        }
        balance = account.balance; 
      }
    });
    return {
      isWithdrawed: isWithdrawed,
      balance: balance
    };
  }

  checkBalance(accountName: string): Account[] {
    return this.accounts.filter(account => account.name === accountName);
  }

  accountExist(accountName: string): boolean {
    return this.accounts.filter(account => account.name === accountName).length > 0 ? true : false;
  }
}
