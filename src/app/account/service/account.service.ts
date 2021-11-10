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

  operation(accountName: string, amount: number, type: Operation): boolean {
    let success: boolean = false;
    
    if(this.accountExist(accountName)) {
      let history: History = {
        operation: type,
        date: new Date(),
        amount: amount
      }

      this.getAccount(accountName).forEach(account => {
        if (type === Operation.DEPOSIT) {
          account.balance += amount;
          account.history!.push(history);
          success = true;
        } else {
          // balance can not be less than 0
            if (account.balance >= amount) {
              account.balance = account.balance - amount;
              account.history!.push(history);
              success = true;
            }
        }
      })
    }
    return success;
  }

  private accountExist(accountName: string): boolean {
    return this.accounts.filter(account => account.name === accountName).length > 0;
  }

  getAccount(accountName: string): Account[] {
    return this.accounts.filter(account => account.name === accountName);
  }
}
