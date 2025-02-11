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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MenuAnimationComponent } from './components/animations/menu-animation/menu-animation.component';
import { SearchAnimationComponent } from './components/animations/search-animation/search-animation.component';
import { LandingpageAnimationComponent } from './components/animations/landingpage-animation/landingpage-animation.component';
import { LoadingComponent } from './components/animations/loading/loading.component';
import { FooterComponent } from './components/footer/footer.component';

export function playerFactory() {
  return player;
}



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
    MenuAnimationComponent,
    SearchAnimationComponent,
    LandingpageAnimationComponent,
    LoadingComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    BrowserAnimationsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
