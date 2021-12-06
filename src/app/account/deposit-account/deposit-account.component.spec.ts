import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Operation, Account } from '../model/account';
import { AccountService } from '../service/account.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { DepositAccountComponent } from './deposit-account.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DepositAccountComponent', () => {
  let component: DepositAccountComponent;
  let fixture: ComponentFixture<DepositAccountComponent>;
  let serviceSpy: jasmine.SpyObj<AccountService>;
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
      declarations: [ DepositAccountComponent ],
      providers: [
        TranslateService,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

// integration test
describe('DepositComponent Integration', () => {
  let component: DepositAccountComponent;
  let fixture: ComponentFixture<DepositAccountComponent>;
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
      declarations: [ 
        DepositAccountComponent
       ],
       providers: [
        AccountService,
        TranslateService
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

  it('make a deposit on an account', () => {
    service.createAccount(TEST_ACCOUNT);
    const resultat$ = service.operation(TEST_ACCOUNT, 1000, Operation.DEPOSIT);
    resultat$.subscribe(success => expect(success).toBeTrue());
  });

  it('make several deposit on an account', () => {
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 100, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 400, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 300, Operation.DEPOSIT);
    
    service.accounts$.subscribe(accounts => account = accounts[0]);
    expect(account.name).toEqual("Test account");
    expect(account.balance).toEqual(800);
    expect(account.history).toHaveSize(3);
  });
  
});