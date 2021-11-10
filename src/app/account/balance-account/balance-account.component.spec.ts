import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';

import { BalanceAccountComponent } from './balance-account.component';

describe('BalanceAccountComponent', () => {
  let component: BalanceAccountComponent;
  let fixture: ComponentFixture<BalanceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains History button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addAccountButton: HTMLButtonElement =  buttons[0].nativeElement;
    expect(addAccountButton.textContent).toContain('History');
  });
  
});

// test integration
describe('BalanceAccountComponent Integration', () => {
  let component: BalanceAccountComponent;
  let fixture: ComponentFixture<BalanceAccountComponent>;
  let service: AccountService;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceAccountComponent ],
      providers: [
        AccountService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = new AccountService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checking a balance of an account', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 300, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 5000, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 400, Operation.WITHDRAW);
    service.operation(TEST_ACCOUNT, 1000, Operation.WITHDRAW);
    service.operation(TEST_ACCOUNT, 2500, Operation.WITHDRAW);
    const account = service.accounts[0];
    expect(account.name).toEqual("Test account");
    expect(account.balance).toEqual(1400);
  });
  
});
