import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/user/homepage/homepage.component';
import { BookingpageComponent } from './pages/user/bookingpage/bookingpage.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ParentCardComponent } from './components/parent-card/parent-card.component';
import { MyBookingComponent } from './components/my-booking/my-booking.component';
import { BulkBookingComponent } from './components/bulk-booking/bulk-booking.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { AgGridModule } from 'ag-grid-angular';





@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BookingpageComponent,
    DashboardComponent,
    BadgeComponent,
    ParentCardComponent,
    MyBookingComponent,
    BulkBookingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
