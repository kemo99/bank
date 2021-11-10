import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AccountService } from '../service/account.service';

import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let serviceSpy: jasmine.SpyObj<AccountService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      providers: [
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
    serviceSpy.createAccount.and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should returns true when Account created', () => {
    const res = serviceSpy.createAccount("dupont");
    expect(res).toBeTrue();
  });

  it('should used "dupont" as an method param', () => {
    serviceSpy.createAccount("dupont");
    expect(serviceSpy.createAccount).toHaveBeenCalledWith('dupont');
  });

  it('should contains Add account button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addAccountButton: HTMLButtonElement =  buttons[0].nativeElement;
    expect(addAccountButton.textContent).toContain('Add account');
  });

});
