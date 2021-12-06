import { TestBed } from '@angular/core/testing';
import { Operation, Account } from '../model/account';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  const TEST_ACCOUNT = "Test account";

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an empty list for the account array', () => {
    let accountSize;
    service.accounts$.subscribe(accounts => accountSize = accounts.length);
    expect(accountSize).toEqual(0);
  });

  it('should have one account', () => {
    let accountSize;
    service.createAccount(TEST_ACCOUNT);
    service.accounts$.subscribe(accounts => accountSize = accounts.length);
    expect(accountSize).toEqual(1);
  });

  it('should have an history with one operation', () => {
    let testAccount!: Account;
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 200, Operation.DEPOSIT);
    service.accounts$.subscribe(accounts => testAccount = accounts[0]);
    expect(testAccount.history.length).toEqual(1);
  });

  it('should have an history with 3 operations', () => {
    let testAccount!: Account;
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 200, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 100, Operation.WITHDRAW);
    service.operation(TEST_ACCOUNT, 50, Operation.DEPOSIT);
    service.accounts$.subscribe(accounts => testAccount = accounts[0]);
    expect(testAccount.history.length).toEqual(3);
  });

  it('should have an history with DEPOSIT', () => {
    let testAccount!: Account;
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 200, Operation.DEPOSIT);
    service.accounts$.subscribe(accounts => testAccount = accounts[0]);
    expect(testAccount.history[0].operation).toEqual(Operation.DEPOSIT);
  });
});
