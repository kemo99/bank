import { TestBed } from '@angular/core/testing';
import { Operation } from '../model/account';

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
    expect(service.accounts.length).toEqual(0);
  });

  it('should have one account', () => {
    service.createAccount(TEST_ACCOUNT);
    expect(service.accounts.length).toEqual(1);
  });

  it('should have an history with one operation', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 200, Operation.DEPOSIT);
    const testAccount = service.accounts[0];
    expect(testAccount.history.length).toEqual(1);
  });

  it('should have an history with 3 operations', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 200, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 100, Operation.WITHDRAW);
    service.operation(TEST_ACCOUNT, 50, Operation.DEPOSIT);
    const testAccount = service.accounts[0];
    expect(testAccount.history.length).toEqual(3);
  });

  it('should have an history with DEPOSIT', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 200, Operation.DEPOSIT);
    const testAccount = service.accounts[0];
    expect(testAccount.history[0].operation).toEqual(Operation.DEPOSIT);
  });
});
