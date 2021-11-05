import { Injectable } from '@angular/core';
import { Account, Operation } from '../model/account'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[] = [];

  constructor() { }

  createAccount(accountName: string): void {
    this.accounts.push({
      name: accountName,
      balance: 0
    });
  }

  addAmount(accountName: string, amount: number): boolean {
    let result: boolean = false;
    this.accounts.forEach(account => {
      if (account.name === accountName) {
        account.balance += amount;
        account.history = {
          operation: Operation.DEPOSIT,
          date: new Date(),
          amount: amount
        }
        result = true;
      } 
    });
    return result;
  }

  withdrawAmount(accountName: string, amount: number): boolean {
    let result: boolean = false;
    this.accounts.forEach(account => {
      if (account.name === accountName) {
        if (account.balance >= amount) {
          account.balance = account.balance - amount;
          account.history = {
            operation: Operation.WITHDRAW,
            date: new Date(),
            amount: amount
          }
          result = true;
        }  
      } 
    });
    return result;
  }

  checkBalance(accountName: string): Account[] {
    return this.accounts;
  }

}
