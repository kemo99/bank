import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '../service/account.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { CreateAccountComponent } from './create-account.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let serviceSpy: jasmine.SpyObj<AccountService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
          isolate: false
        }) 
      ],
      declarations: [ CreateAccountComponent ],
      providers: [
        TranslateService,
        { provide: AccountService, useValue: serviceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceSpy = jasmine.createSpyObj('AccountService', ['createAccount']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should used "dupont" as an method param', () => {
    serviceSpy.createAccount("dupont");
    expect(serviceSpy.createAccount).toHaveBeenCalledWith('dupont');
  });

});


describe('CreateAccountComponent Integration', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let service: AccountService;
  const TEST_ACCOUNT = "dupont";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
          isolate: false
        }) 
      ],
      declarations: [ CreateAccountComponent ],
      providers: [
        AccountService,
        TranslateService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new AccountService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should returns true when Account created', () => {
    const res$ = service.createAccount(TEST_ACCOUNT);
    res$.subscribe(succes => expect(succes).toBeTrue());
  });

});
