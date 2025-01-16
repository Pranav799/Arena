import { Component } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi } from 'ag-grid-community'; // Column Definition Type Interface

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

  
  isSidePanelOpen = true;  // Set initial state of the side panel
  activeSection: string = 'createvenue';  // Default active section

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


   rowData = [
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ];
  
    colDefs: ColDef[] = [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' },
      { headerName: 'Electric', field: 'electric' }
    ];

}
