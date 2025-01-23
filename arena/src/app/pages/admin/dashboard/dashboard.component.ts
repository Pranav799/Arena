import { Component } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';
import { AgGridAngular } from 'ag-grid-angular'; 
import type { ColDef, GridApi } from 'ag-grid-community'; 

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
  activeItem: string = 'All Venues'; 
  buttonName: string = 'Venue Type'; 
  createVenueModal: boolean = false;
  selectedDate: Date | null = null;


  constructor(private venueService: VenueService) {}
  
  isSidePanelOpen = true;  
  isDropdownOpen = false;
  activeSection: string = 'dashboard';  

  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

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

gridApi!: GridApi;
gridColumnApi: any;

cards = [
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi4.jpg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
  , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
], 
    selectedButtons: [] as string[] // Can store multiple selected slots
  },
  { 
    heading: 'P2 Conference Hall', 
    location: 'Humanities Block', 
    capacity: 180, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi3.jpg', 
    address: '1st Floor Humanities Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
  , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
], 
    selectedButtons: [] as string[] // Can store multiple selected slots
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi4.jpg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[] // Can store multiple selected slots
  },
];

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

  ngOnInit() {}

  // Handle slot selection in a card
  onButtonSelect(cardIndex: number, button: string): void {
    // Clear selected slots in all other cards
    this.cards.forEach((card, index) => {
      if (index !== cardIndex) {
        card.selectedButtons = []; // Clear selection in other cards
      }
    });

    // Toggle the selected button in the current card
    const selectedButtons = this.cards[cardIndex].selectedButtons;
    const buttonIndex = selectedButtons.indexOf(button);
    
    if (buttonIndex === -1) {
      // If the button is not already selected, add it
      selectedButtons.push(button);
    } else {
      // If the button is already selected, remove it
      selectedButtons.splice(buttonIndex, 1);
    }
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected Rows:', selectedRows);
  }

  onPaginationChanged() {
    console.log('Current Page:', this.gridApi.paginationGetCurrentPage());
  }

  downloadCSV() {
    if (this.gridApi) {
      const params = {
        fileName: 'vehicles.csv',
        allColumns: true,  
      };
      this.gridApi.exportDataAsCsv(params);
    }
  }

  setDropdown(status : boolean){
    this.isDropdownOpen = status;
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setButtonName(item: string): void {
    this.buttonName = item; 
  }

  closeCreateVenueModal(){
    this.createVenueModal=false;
  }

  openCreateVenueModal(){
    this.createVenueModal=true;
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDateString = input.value;  
    if (selectedDateString) {
      this.selectedDate = new Date(selectedDateString);  
      console.log('Selected Date:', this.selectedDate); 
    }
  }

  

}
