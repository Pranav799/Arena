import { Component } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

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

  
  isSidePanelOpen = true;  // Set initial state of the side panel
  activeSection: string = 'dashboard';  // Default active section

  // Toggle the side panel visibility
  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

  // Set active section to change content dynamically
  setActiveSection(section: string) {
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
