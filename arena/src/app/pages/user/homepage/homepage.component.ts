import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  
  // Navigation 
  constructor(private router: Router) {}
  navigateToBooking() {
    this.router.navigate(['/booking']);
  }

  badges: string[] = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
    , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
  ];

}
