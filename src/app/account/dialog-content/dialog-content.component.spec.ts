import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content.component';

describe('DialogContentComponent', () => {
  let component: DialogContentComponent;
  let fixture: ComponentFixture<DialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
          isolate: false
        }) 
      ],
      declarations: [ DialogContentComponent ],
      providers: [
        TranslateService,
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
