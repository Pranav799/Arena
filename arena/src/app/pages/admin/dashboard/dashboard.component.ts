import { Component } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  venue = {
    venueId: '',
    venueName: '',
    block: '',
    seatingCapacity: '',
    ac: 'Non A/C',
    permission: 'No',
    location: '',
    venueType: '',
    picture: '',
    intervalTimings: ''
  };

  constructor(private venueService: VenueService) {}
  
  activeSection: string = 'dashboard';

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  onSubmit() {
    this.venueService.addVenue(this.venue).subscribe(response => {
      console.log('Venue added successfully', response);
    }, error => {
      console.error('Error adding venue', error);
    });
  }


}
