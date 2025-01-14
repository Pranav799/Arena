import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/user/homepage/homepage.component';
import { BookingpageComponent } from './pages/user/bookingpage/bookingpage.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { TestComponent } from './pages/shared/test/test.component';



const routes: Routes = [

  {path:"", component:LoginComponent},
  {path:"home", component:HomepageComponent},
  {path:"booking", component:BookingpageComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"login", component:LoginComponent},
  {path:"test", component:TestComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


