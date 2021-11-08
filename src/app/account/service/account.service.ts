import { Injectable } from '@angular/core';
import { Account, History, Operation } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[] = [];

  constructor() { }

  createAccount(accountName: string): void {
    this.accounts.push({
      name: accountName,
      balance: 0,
      history: []
    });
  }

  addAmount(accountName: string, amount: number): boolean {
    let result: boolean = false;
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

  withdrawAmount(accountName: string, amount: number): boolean {
    let result: boolean = false;
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
          result = true;
        }  
      } 
    });
    return result;
  }

  checkBalance(accountName: string): Account[] {
    //let accountBalance: Account[] = [];

    /**this.accounts.forEach(account => {
      if (account.name === accountName) {
        accountBalance.push(account);
        console.log(true);
      }
    });*/

    return this.accounts.filter(account => account.name === accountName);
    //return accountBalance;
  }

}
