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

  myTheme: any;


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


// agGrid 
gridApi!: GridApi;
gridColumnApi: any;

rowData = [
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Chevrolet', model: 'Bolt EV', price: 37995, electric: true },
  { make: 'Honda', model: 'Civic', price: 24900, electric: false },
  { make: 'Nissan', model: 'Leaf', price: 34990, electric: true },
  { make: 'BMW', model: 'i4', price: 56100, electric: true },
  { make: 'Audi', model: 'e-tron', price: 65900, electric: true },
  { make: 'Ford', model: 'Mustang Mach-E', price: 43250, electric: true },
  { make: 'Hyundai', model: 'Elantra', price: 21800, electric: false },
  { make: 'Volkswagen', model: 'ID.4', price: 39990, electric: true },
  { make: 'Mercedes-Benz', model: 'EQB', price: 54000, electric: true },
  { make: 'Jeep', model: 'Grand Cherokee', price: 47900, electric: false },
  { make: 'Kia', model: 'Soul EV', price: 33990, electric: true },
  { make: 'Subaru', model: 'Outback', price: 35800, electric: false },
  { make: 'Rivian', model: 'R1T', price: 67495, electric: true },
  { make: 'Porsche', model: 'Taycan', price: 82500, electric: true },
  { make: 'Mitsubishi', model: 'Outlander', price: 27495, electric: false },
  { make: 'Volvo', model: 'XC40 Recharge', price: 53900, electric: true },
  { make: 'Lexus', model: 'RX', price: 46900, electric: false },
  { make: 'Chrysler', model: 'Pacifica Hybrid', price: 44995, electric: true }
];

  colDefs: ColDef[] = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true, editable: true, floatingFilter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true, floatingFilter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true, editable: true },
    { headerName: 'Electric', field: 'electric', sortable: true, filter: true, editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: [true, false] } },
  ];

  paginationPageSize = 10;
  paginationPageSizeSelector = [5, 10, 20];

  rowSelection: 'multiple' | 'single' = 'multiple'; 
  domLayout: 'normal' | 'autoHeight' | 'print' = 'autoHeight'; 
  defaultColDef = {
    resizable: true,
    filter: true,
    sortable: true,
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // Example function to handle selection or pagination events
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected Rows:', selectedRows);
  }

  // Example function to handle pagination changes
  onPaginationChanged() {
    console.log('Current Page:', this.gridApi.paginationGetCurrentPage());
  }

  downloadCSV() {
    if (this.gridApi) {
      const params = {
        fileName: 'vehicles.csv',
        allColumns: true,  // Export all columns
      };
      this.gridApi.exportDataAsCsv(params);
    }
  }

}
