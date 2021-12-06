import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Account, History, Operation } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts$: Observable<Account[]> = of([]);

  constructor() { }

  createAccount(accountName: string): Observable<boolean> {
   let isAdded: boolean = false;
   this.accountExist(accountName).subscribe(success => {
     if(!success) {
      this.accounts$.pipe(map(accounts => 
        accounts.push({
        name: accountName,
        balance: 0,
        history: []
      }))).subscribe(
        () => isAdded = true
      );
      
     }
   });

   this.accounts$.subscribe(account => console.log(account))
   return of(isAdded);
  }

  operation(accountName: string, amount: number, type: Operation): Observable<boolean> {
    let isDone: boolean = false;
    this.accountExist(accountName).subscribe(success => {
      if(success) {
        let history: History = {
          operation: type,
          date: new Date(),
          amount: amount
        }
        this.getAccount(accountName).subscribe(
            accounts => {
            accounts.forEach(account => {
              if (type === Operation.DEPOSIT) {
                account.balance += amount;
                account.history!.push(history);
                isDone = true;
              } else {
                // balance can not be less than 0
                  if (account.balance >= amount) {
                    account.balance = account.balance - amount;
                    account.history!.push(history);
                    isDone = true;
                  }
              }
            })
          }
        );
      }
    });
    return of(isDone);
  }

  private accountExist(accountName: string): Observable<boolean> {
    return this.accounts$.pipe(
      map(accounts => {
        return accounts.filter(account => account.name === accountName).length > 0;
      }));
  }

  getAccount(accountName: string): Observable<Account[]> {
    return this.accounts$.pipe(map(accounts => {
      return accounts.filter(account => account.name === accountName);
    }));
  }
}
