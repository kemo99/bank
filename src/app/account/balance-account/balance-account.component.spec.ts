import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Operation, Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { BalanceAccountComponent } from './balance-account.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BalanceAccountComponent', () => {
  let component: BalanceAccountComponent;
  let fixture: ComponentFixture<BalanceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
          isolate: false
        }) 
      ],
      declarations: [ BalanceAccountComponent ],
      providers: [
        TranslateService
      ]
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
});

// test integration
describe('BalanceAccountComponent Integration', () => {
  let component: BalanceAccountComponent;
  let fixture: ComponentFixture<BalanceAccountComponent>;
  let service: AccountService;
  let account: Account;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
          isolate: false
        }) 
      ],
      declarations: [ BalanceAccountComponent ],
      providers: [
        AccountService,
        TranslateService
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
    
    service.accounts$.subscribe(accounts => account = accounts[0]);
    expect(account.name).toEqual("Test account");
    expect(account.balance).toEqual(1400);
  });
  
});
