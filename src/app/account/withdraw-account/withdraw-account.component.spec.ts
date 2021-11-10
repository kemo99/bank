import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Operation } from '../model/account';
import { AccountService } from '../service/account.service';

import { WithdrawAccountComponent } from './withdraw-account.component';

describe('WithdrawAccountComponent', () => {
  let component: WithdrawAccountComponent;
  let fixture: ComponentFixture<WithdrawAccountComponent>;
  let serviceSpy: jasmine.SpyObj<AccountService>;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawAccountComponent ],
      providers: [
        { provide: AccountService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceSpy = jasmine.createSpyObj('AccountService', ['createAccount', 'operation']);
    serviceSpy.createAccount.and.returnValue(true);
    serviceSpy.operation.and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('make a withdraw on an account', () => {
    serviceSpy.operation(TEST_ACCOUNT, 600, Operation.DEPOSIT);
    const resultat = serviceSpy.operation(TEST_ACCOUNT, 200, Operation.WITHDRAW);
    expect(resultat).toBeTrue();
  });
});

// integration test
describe('WithdrawComponent Integration', () => {
  let component: WithdrawAccountComponent;
  let fixture: ComponentFixture<WithdrawAccountComponent>;
  let service: AccountService;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        WithdrawAccountComponent
       ],
       providers: [
        AccountService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AccountService();
  });

  it('make several deposit and withdraw on an account', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 500, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 400, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 100, Operation.WITHDRAW);
    service.operation(TEST_ACCOUNT, 300, Operation.WITHDRAW);
    const account = service.accounts[0];
    expect(account.name).toEqual("Test account");
    expect(account.balance).toEqual(500);
    expect(account.history).toHaveSize(4);
  });
  
});