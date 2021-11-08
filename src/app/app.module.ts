import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { DepositAccountComponent } from './account/deposit-account/deposit-account.component';
import { WithdrawAccountComponent } from './account/withdraw-account/withdraw-account.component';
import { BalanceAccountComponent } from './account/balance-account/balance-account.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    CreateAccountComponent,
    DepositAccountComponent,
    WithdrawAccountComponent,
    BalanceAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
