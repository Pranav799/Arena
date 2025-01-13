import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent {

  constructor(private router:Router){}
  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
