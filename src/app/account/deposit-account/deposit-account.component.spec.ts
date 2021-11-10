import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';

import { DepositAccountComponent } from './deposit-account.component';

describe('DepositAccountComponent', () => {
  let component: DepositAccountComponent;
  let fixture: ComponentFixture<DepositAccountComponent>;
  let serviceSpy: jasmine.SpyObj<AccountService>;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositAccountComponent ],
      providers: [
        { provide: AccountService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceSpy = jasmine.createSpyObj('AccountService', ['createAccount', 'operation']);
    serviceSpy.createAccount.and.returnValue(true);
    serviceSpy.operation.and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('make a deposit on an account', () => {
    const resultat = serviceSpy.operation(TEST_ACCOUNT, 1000, Operation.DEPOSIT);
    expect(resultat).toBeTrue();
  });

  it('should contains Make Deposit button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addAccountButton: HTMLButtonElement =  buttons[0].nativeElement;
    expect(addAccountButton.textContent).toContain('Make Deposit');
  });
  
});

// integration test
describe('DepositComponent Integration', () => {
  let component: DepositAccountComponent;
  let fixture: ComponentFixture<DepositAccountComponent>;
  let service: AccountService;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DepositAccountComponent
       ],
       providers: [
        AccountService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AccountService();
  });

  it('make several deposit on an account', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 100, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 400, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 300, Operation.DEPOSIT);
    const account = service.accounts[0];
    expect(account.name).toEqual("Test account");
    expect(account.balance).toEqual(800);
    expect(account.history).toHaveSize(3);
  });
  
});