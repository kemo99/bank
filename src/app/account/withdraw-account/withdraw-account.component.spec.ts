import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Operation, Account} from '../model/account';
import { AccountService } from '../service/account.service';
import {TranslateFakeLoader,TranslateLoader,TranslateModule,TranslateService } from '@ngx-translate/core';
import { WithdrawAccountComponent } from './withdraw-account.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('WithdrawAccountComponent', () => {
  let component: WithdrawAccountComponent;
  let fixture: ComponentFixture<WithdrawAccountComponent>;
  let serviceSpy: jasmine.SpyObj<AccountService>;
  const TEST_ACCOUNT = "Test account";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawAccountComponent ],
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [
        TranslateService,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
       imports: [
        MatDialogModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
       providers: [
        AccountService,
        TranslateService
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
    let account!: Account;
    service.createAccount(TEST_ACCOUNT);
    service.operation(TEST_ACCOUNT, 500, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 400, Operation.DEPOSIT);
    service.operation(TEST_ACCOUNT, 100, Operation.WITHDRAW);
    service.operation(TEST_ACCOUNT, 300, Operation.WITHDRAW);
    service.accounts$.subscribe(accounts => account = accounts[0]);
    expect(account.name).toEqual("Test account");
    expect(account.balance).toEqual(500);
    expect(account.history).toHaveSize(4);
  });
  
});