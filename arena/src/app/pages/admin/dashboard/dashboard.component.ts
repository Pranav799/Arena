import { Component } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';
import { DashboardService } from './dashboard.service';
import { AgGridAngular } from 'ag-grid-angular'; 
import type { ColDef, GridApi } from 'ag-grid-community'; 
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(100%)',  
      })),
      transition(':enter', [
        animate('0.2s ease-out', style({
          opacity: 10,
          transform: 'translateY(0)',  
        }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({
          opacity: 10,
          transform: 'translateY(100%)',  
        }))
      ])
    ])
  ]
})
export class DashboardComponent {

 venue = {
    arenaVenueId_VenueCreation_text: '',
    arenaVenueName_VenueCreation_text: '',
    arenaBlockName_VenueCreation_text: '',
    arenaSeatingCapacityOfVenue_VenueCreation_Integer:0,
    arenaIsVenueAirConditionedOrNot_VenueCreation_text: '',
    arenaIsPermissionRequiredForAuditorium_VenueCreation_text: '',
    arenaVenueLocation_VenueCreation_text: '',
    arenaTypeOfVenue_VenueCreation_text: '',
    aernaIntervalTiming_VenueCreation_boolean: false,
    arenaVenueImage_VenueCreation_Image:''
  };

  myTheme: any;
  activeItem: string = 'All Venues'; 
  buttonName: string = 'Venue Type'; 
  createVenueModal: boolean = false;
  errorVenueCreation: boolean = false;
  selectedDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  tommorowDate: string;
  venues: any[] = [];
  
  editVenueModal:boolean = false;  
  editpage:boolean = false;
  venueID: string = '';
  venueName: string = '';
  blockName: string = '';
  seatingCapacity: number = 0;
  acStatus: string = '';
  permissionRequired: string = '';
  venueLocation: string = '';
  venueType: string = '';
  intrevalTiming: boolean = false;
  venueImage: string = '';
  venueObjId: string = '';
  creationTimeStamp: string = '';


  constructor(private venueService: VenueService,private dashboardService: DashboardService) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tommorowDate = tomorrow.toISOString().split('T')[0];
  }
  
  isSidePanelOpen = true;  
  isDropdownOpen = false;
  activeSection: string = 'dashboard';  

  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

  setActiveSection(section: string) {
    this.activeSection = section;
    this.fetchVenue();
    console.log(this.venues)
  }

  onSubmit() {
    this.dashboardService.addVenue(this.venue).subscribe(response => {
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
    imagepath: 'assets/images/audi1.jpg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
  , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
], 
    selectedButtons: [] as string[] 
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
    selectedButtons: [] as string[] 
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
    selectedButtons: [] as string[]
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/10.jpg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[]
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi5.webp', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[]
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi6.jpeg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[]
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi7.webp', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[]
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi8.jpg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[]
  },
  { 
    heading: 'Meeting Room', 
    location: 'PG Block', 
    capacity: 11, 
    acstatus: 'AC', 
    imagepath: 'assets/images/audi9.jpeg', 
    address: '2nd Floor PG Block', 
    buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
      , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
    ], 
    selectedButtons: [] as string[]
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

  onButtonSelect(cardIndex: number, button: string): void {
    this.cards.forEach((card, index) => {
      if (index !== cardIndex) {
        card.selectedButtons = []; 
      }
    });

    const selectedButtons = this.cards[cardIndex].selectedButtons;
    const buttonIndex = selectedButtons.indexOf(button);

    if (buttonIndex === -1) {
      selectedButtons.push(button);
    } else {
      selectedButtons.splice(buttonIndex, 1);
    }
  }

  onSeatingCapacityChange(value: string) {
    this.venue.arenaSeatingCapacityOfVenue_VenueCreation_Integer = parseInt(value, 10);
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

  setDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setItemForEdit(item: string): void {
    this.venueType = item; 
    this.setDropdown();
  }

  setButtonName(item: string): void {
    this.buttonName = item; 
    this.venue.arenaTypeOfVenue_VenueCreation_text = item;
  }

  closeCreateVenueModal(){
    this.createVenueModal=false;
  }

  setEditVenueModal() {
    this.editVenueModal = !this.editVenueModal;
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

  createVenue(){
    this.onSubmit();
    this.openCreateVenueModal()
  }

  editVenue(){
    this.setEditVenueModal()
    this.editCreatedVenue(this.venueID,
      this.venueName,
      this.blockName,
      this.seatingCapacity,
      this.acStatus,
      this.permissionRequired,
      this.venueLocation,
      this.venueType,
      this.intrevalTiming,
      this.venueImage,
      this.venueObjId,
      this.creationTimeStamp)
  }

  errorCreateVenue(){
    this.errorVenueCreation=true
    setTimeout(()=>{
      this.errorVenueCreation = false;
    },3000)
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 1000; 
  }

  fetchVenue(): void {  
    this.dashboardService.getVenue().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.venues = response.responseData.data.map((venue: any) => ({
            venueID: venue.arenaVenueId_VenueCreation_text,
            venueName: venue.arenaVenueName_VenueCreation_text,
            blockName: venue.arenaBlockName_VenueCreation_text,
            seatingCapacity:venue.arenaSeatingCapacityOfVenue_VenueCreation_Integer,
            acStatus:venue.arenaIsVenueAirConditionedOrNot_VenueCreation_text,
            permissionRequired:venue.arenaIsPermissionRequiredForAuditorium_VenueCreation_text,
            venueLocation: venue.arenaVenueLocation_VenueCreation_text,
            venueType: venue.arenaTypeOfVenue_VenueCreation_text,
            intrevalTiming:venue.aernaIntervalTiming_VenueCreation_boolean,
            venueImage: venue.arenaVenueImage_VenueCreation_Image,
            venueObjId:venue._id,
            creationTimeStamp:venue.arenaVenueCreationTimeStamp_VenueCreation_DateTime,
          }));
          console.log('Mapped Cards:', this.venues);

        } else {
          console.error('Invalid or empty API response:', response);
          this.venues = [];

        }
      },
      (error) => {
        console.error('Error fetching venue slots:', error);
        this.venues = [];
      }
    );
  }

  editCreatedVenue(arenaVenueId_VenueCreation_text: string,
    arenaVenueName_VenueCreation_text: string,
    arenaBlockName_VenueCreation_text: string,
    arenaSeatingCapacityOfVenue_VenueCreation_Integer: number,
    arenaIsVenueAirConditionedOrNot_VenueCreation_text: string,
    arenaIsPermissionRequiredForAuditorium_VenueCreation_text: string,
    arenaVenueLocation_VenueCreation_text: string,
    arenaTypeOfVenue_VenueCreation_text: string,
    aernaIntervalTiming_VenueCreation_boolean: boolean,
    arenaVenueImage_VenueCreation_Image:string,
    arena_VenueObjectId_UpdateVenue_Text:string,
    arenaVenueCreationTimeStamp_VenueCreation_DateTime: string): void {  
    this.dashboardService.editVenue(arenaVenueId_VenueCreation_text, arenaVenueName_VenueCreation_text, arenaBlockName_VenueCreation_text,
      arenaSeatingCapacityOfVenue_VenueCreation_Integer, arenaIsVenueAirConditionedOrNot_VenueCreation_text, arenaIsPermissionRequiredForAuditorium_VenueCreation_text, arenaVenueLocation_VenueCreation_text,
      arenaTypeOfVenue_VenueCreation_text, aernaIntervalTiming_VenueCreation_boolean, arenaVenueImage_VenueCreation_Image,
      arena_VenueObjectId_UpdateVenue_Text, arenaVenueCreationTimeStamp_VenueCreation_DateTime).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          
        } else {
         
        }
      },
      (error) => {
        console.error('Error fetching venue slots:', error);
      }
    );
  }

  editBooking(event:{venueID: string;
    venueName: string;
    blockName: string;
    seatingCapacity: number;
    acStatus: string;
    permissionRequired: string;
    venueLocation: string;
    venueType: string;
    intrevalTiming: boolean;
    venueImage: string;
    venueObjId: string;
    creationTimeStamp: string;}){
        this.editpage=true;
        this.venueID=event.venueID;
        this.venueName=event.venueName;
        this.blockName=event.blockName;
        this.seatingCapacity=event.seatingCapacity;
        this.acStatus=event.acStatus;
        this.permissionRequired=event.permissionRequired;
        this.venueLocation=event.venueLocation;
        this.venueType=event.venueType;
        this.intrevalTiming=event.intrevalTiming;
        this.venueImage=event.venueImage;
        this.venueObjId=event.venueObjId;
        this.creationTimeStamp=event.creationTimeStamp;
  }

}
