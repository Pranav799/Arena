import { Component } from '@angular/core';
import { VenueService } from 'src/app/service/venue.service';
import { DashboardService } from './dashboard.service';
import { AgGridAngular } from 'ag-grid-angular'; 
import type { ColDef, GridApi } from 'ag-grid-community'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
  reportDate:Date = new Date();
  tommorowDate: string;
  venues: any[] = [];
  bookings: any[] = [];

  
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

  setDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDateString = input.value;  
    if (selectedDateString) {
      this.reportDate = new Date(selectedDateString);  
    }
    this.getBookings(this.formatDate(this.reportDate));
  }

  gridApi!: GridApi;
  gridColumnApi: any;
 
  colDefs: ColDef[] = [
    { headerName: 'Booking ID', field: 'BookingId', sortable: true, filter: true, editable: false, floatingFilter: false },
    { headerName: 'venue ID', field: 'venueId', sortable: true, filter: true, editable: false, floatingFilter: false },
    { headerName: 'venue Name', field: 'venueName', sortable: true, filter: true, editable: false },
    { headerName: 'Event Date', field: 'eventDate', sortable: true, filter: true, editable: false },
    { headerName: 'Booked by', field: 'bookedBy', sortable: true, filter: true, editable: false },
    { headerName: 'Event Name ', field: 'eventName', sortable: true, filter: true, editable: false },
    { headerName: 'Resource Person ', field: 'resourcePerson', sortable: true, filter: true, editable: false },
    { headerName: 'Event Timings ', field: 'eventTimings', sortable: true, filter: true, editable: false, wrapText: true, autoHeight: true, width: 400 }, 
  ];

  paginationPageSize = 20;
  paginationPageSizeSelector = [5, 10, 20];

  rowSelection: 'multiple' | 'single' = 'multiple'; 
  domLayout: 'normal' | 'autoHeight' | 'print' = 'autoHeight'; 
  defaultColDef = {
    resizable: true,
    filter: true,
    sortable: true,
  };

  ngOnInit() {}


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
        fileName: 'Booking_Report.csv',
        allColumns: true,  
      };
      this.gridApi.exportDataAsCsv(params);
    }
  }

  downloadPDF() {
    if (!this.gridApi) return;
  
    const doc = new jsPDF();
    doc.text("Booking Report", 14, 10);
    const colDefs = this.gridColumnApi.getAllColumns().map((col: any) => col.getColDef().headerName);
    const rowData: any[] = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(Object.values(node.data)); 
    });
    autoTable(doc, {
      head: [colDefs], 
      body: rowData,   
      startY: 20,      
      theme: 'grid',
    });
    doc.save("Booking_Report.pdf");
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

  getBookings(date: string): void {  
    this.dashboardService.getBookings(date).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.bookings = response.responseData.data.map((booking: any) => ({
            BookingId: booking.arenaBookingId_UserBooking_Text,
            venueId: booking.arena_venueIdCounter_UserBooking_Text,
            venueName: booking.arena_SpotName_UserBooking_Text,
            eventDate: booking.arenaEventDate_UserBooking_Date,
            bookedBy: booking.arenaUsername_UserBooking_Text,
            eventName: booking.arenaEventName_UserBooking_Text,
            resourcePerson: booking.arenaResourcePerson_UserBooking_Text,
            eventTimings: booking.arenaBookedSlots_UserBooking_Array,
          }));
          console.log('Mapped Cards:', this.bookings);

        } else {
          console.error('Invalid or empty API response:', response);
          this.bookings = [];

        }
      },
      (error) => {
        console.error('Error fetching bookings :', error);
        this.bookings = [];
      }
    );
  }

  formatDate(date: Date | null): string {
    if (!date) return ''; 
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
