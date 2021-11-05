import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawAccountComponent } from './withdraw-account.component';

describe('WithdrawAccountComponent', () => {
  let component: WithdrawAccountComponent;
  let fixture: ComponentFixture<WithdrawAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
