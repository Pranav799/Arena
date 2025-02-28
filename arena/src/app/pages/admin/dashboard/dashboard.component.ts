import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VenueService } from 'src/app/service/venue.service';
import { DashboardService } from './dashboard.service';
import { AgGridAngular } from 'ag-grid-angular'; 
import type { ColDef, GridApi } from 'ag-grid-community'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

interface Venue {
  arenaVenueId_VenueCreation_Text: string;
  arenaVenueName_VenueCreation_Text: string;
  arenaBlockName_VenueCreation_Text: string;
  arenaSeatingCapacityOfVenue_VenueCreation_Int: number;
  arenaIsVenueAirConditionedOrNot_VenueCreation_Text: string;
  arenaIsPermissionRequiredForAuditorium_VenueCreation_Text: string;
  arenaVenueLocation_VenueCreation_Text: string;
  arenaTypeOfVenue_VenueCreation_Text: string;
  arenaIntervalTiming_VenueCreation_Bool: boolean;
  arenaVenueImage_VenueCreation_Image: File | null;
}

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
  @ViewChild('eventForm') eventForm!: NgForm;

  venue: Venue = {
    arenaVenueId_VenueCreation_Text: '',
    arenaVenueName_VenueCreation_Text: '',
    arenaBlockName_VenueCreation_Text: '',
    arenaSeatingCapacityOfVenue_VenueCreation_Int: 0,
    arenaIsVenueAirConditionedOrNot_VenueCreation_Text: '',
    arenaIsPermissionRequiredForAuditorium_VenueCreation_Text: '',
    arenaVenueLocation_VenueCreation_Text: '',
    arenaTypeOfVenue_VenueCreation_Text: '',
    arenaIntervalTiming_VenueCreation_Bool: false,
    arenaVenueImage_VenueCreation_Image: null
  };

  myTheme: any;
  activeItem: string = ''; 
  createVenueModal: boolean = false;
  errorVenueCreation: boolean = false;
  selectedDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  reportDate:Date = new Date();
  tommorowDate: string;
  venues: any[] = [];
  bookings: any[] = [];
  cancelledBookings: any[] = [];
  filteredVenues: any[] = []; 
  searchText: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;
  minToDate: string = '';
  fromDateCancellationReport: Date | null = null;
  toDateCancellationReport: Date | null = null;
  minToDateCancellationReport: string = '';
  errorVenueType: boolean = false;
  errorEnteringVenueType: boolean = true;
  
  selectedFileName: string = 'Select a file or drag and drop here';
  
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
  venueImagePath: string = '';
  reportselector: string = 'booking';

  uploadMessage: string = '';


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
    this.filteredVenues = [...this.venues]
    console.log(this.venues)
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.venue.arenaVenueImage_VenueCreation_Image = file;
      this.selectedFileName = file.name; // Update the displayed file name
      console.log('Selected file:', this.venue.arenaVenueImage_VenueCreation_Image);
    }
  }

  onSubmit() {
    if (!this.venue.arenaVenueImage_VenueCreation_Image) {
      console.error('No file selected for upload');
      return;
    }
  
    this.dashboardService.addVenue(this.venue, this.venue.arenaVenueImage_VenueCreation_Image).subscribe(
      response => {
        console.log('Venue added successfully', response);
      },
      error => {
        console.error('Error adding venue', error);
      }
    );
  }
  

setStartDate(event: any) {
  this.fromDate = new Date(event.target.value); // Convert string to Date
  this.minToDate = this.formatDate(this.fromDate);
  this.validateDates();
}

setToDate(event: any) {
  this.toDate = new Date(event.target.value); // Convert string to Date
  this.validateDates();
}

validateDates() {
  if (this.fromDate && this.toDate) {
    if (this.toDate >= this.fromDate) {
      console.log('Valid Date Range:', this.formatDate(this.fromDate), 'to', this.formatDate(this.fromDate));
      this.triggerFunction();
    } else {
      console.warn('Invalid Date Selection: To Date should be greater than From Date');
    }
  }
}

triggerFunction() {
  console.log('Function Triggered Successfully!');
  this.getBookings(this.formatDate(this.fromDate),this.formatDate(this.toDate));
}



setStartDateCancellationReport(event: any) {
  this.fromDateCancellationReport = new Date(event.target.value); // Convert string to Date
  this.minToDateCancellationReport = this.formatDate(this.fromDateCancellationReport);
  this.validateDatesCancellationReport();
}

setToDateCancellationReport(event: any) {
  this.toDateCancellationReport = new Date(event.target.value); // Convert string to Date
  this.validateDatesCancellationReport();
}

validateDatesCancellationReport() {
  if (this.fromDateCancellationReport && this.toDateCancellationReport) {
    if (this.toDateCancellationReport >= this.fromDateCancellationReport) {
      console.log('Valid Date Range:', this.formatDate(this.fromDateCancellationReport), 'to', this.formatDate(this.toDateCancellationReport));
      this.triggerFunctionCancellationReport();
    } else {
      console.warn('Invalid Date Selection: To Date should be greater than From Date');
    }
  }
}

triggerFunctionCancellationReport() {
  console.log('Function Triggered Successfully!');
  this.getCancelledBookings(this.formatDate(this.fromDateCancellationReport),this.formatDate(this.toDateCancellationReport));
}


  gridApi!: GridApi;
  gridColumnApi: any;
 
  colDefs: ColDef[] = [
    { headerName: 'BOOKING ID', field: 'BookingId', sortable: true, filter: true, editable: true, floatingFilter: false },
    { headerName: 'VENUE ID', field: 'venueId', sortable: true, filter: true, editable: false, floatingFilter: false },
    { headerName: 'VENUE NAME', field: 'venueName', sortable: true, filter: true, editable: false },
    { headerName: 'EVENT DATE', field: 'eventDate', sortable: true, filter: true, editable: false },
    { headerName: 'BOOKED BY', field: 'bookedBy', sortable: true, filter: true, editable: false },
    { headerName: 'EVENT NAME ', field: 'eventName', sortable: true, filter: true, editable: false },
    { headerName: 'RESOURCE PERSON ', field: 'resourcePerson', sortable: true, filter: true, editable: false },
    { headerName: 'EVENT TIMINGS ', field: 'eventTimings', sortable: true, filter: true, editable: false, wrapText: true, autoHeight: true, width: 400 }, 
  ];

  CancelledcolDefs: ColDef[] = [
    { headerName: 'BOOKING ID', field: 'BookingId', sortable: true, filter: true, editable: true, floatingFilter: false },
    { headerName: 'VENUE NAME', field: 'venueName', sortable: true, filter: true, editable: false },
    { headerName: 'EVENT DATE', field: 'eventDate', sortable: true, filter: true, editable: false },
    { headerName: 'BOOKED BY', field: 'bookedBy', sortable: true, filter: true, editable: false },
    { headerName: 'CANCELLED DATE', field: 'cancelledDate', sortable: true, filter: true, editable: false },
    { headerName: 'CANCELLED BY', field: 'cancelledBy', sortable: true, filter: true, editable: false },
    { headerName: 'CANCELLED REASON ', field: 'cancelledReason', sortable: true, filter: true, editable: false },
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

  ngOnInit() {
    this.fetchVenue();
    this.filteredVenues = [...this.venues]
  }


  onSeatingCapacityChange(value: string) {
    this.venue.arenaSeatingCapacityOfVenue_VenueCreation_Int = parseInt(value, 10);
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


  // exportToPDF() {
  //   // Get column headers dynamically
  //   const headers = this.colDefs.map(col => col.headerName);

  //   // Get row data dynamically
  //   const rows = this.bookings.map(row =>
  //     this.colDefs.map(col => row[col.field as keyof typeof row])
  //   );

  //   const docDefinition = {
  //     content: [
  //       { text: 'AG Grid Data Export', style: 'header' },
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: Array(headers.length).fill('*'), // Adjust column widths dynamically
  //           body: [
  //             headers, // Table headers
  //             ...rows   // Table rows
  //           ]
  //         }
  //       }
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 0, 0, 10]
  //       }
  //     }
  //   };

  //   (pdfMake as any).createPdf(docDefinition).download('grid-data.pdf');
  // }




  setDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
    this.venue.arenaTypeOfVenue_VenueCreation_Text = item;
    this.setDropdown();
    this.errorVenueType = false;
    this.errorEnteringVenueType = false;
  }

  setItemForEdit(item: string): void {
    this.venueType = item; 
    this.setDropdown();
  }

  setButtonName(item: string): void {
    this.venue.arenaTypeOfVenue_VenueCreation_Text = item;
  }

  closeCreateVenueModal(){
    this.createVenueModal=false;
  }

  setEditVenueModal() {
    this.editpage = false;
    console.log("hi");
    this.fetchVenue();
    console.log(this.venues);
    this.filteredVenues = [...this.venues]
    console.log("Filterd Venues"+this.filteredVenues);

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
    if(this.errorEnteringVenueType === false){
    this.onSubmit();
    this.openCreateVenueModal();
    this.eventForm.resetForm();
    this.venue.arenaVenueImage_VenueCreation_Image = null;
    this.fetchVenue();
    this.filteredVenues = [...this.venues];
    }else{
      if (this.activeItem === '') { // Only show error if no venue type is selected
        this.errorVenueType = true;
        setTimeout(() => {
          this.errorVenueType = false;
        }, 3000);
      }
    }
  }

  editVenue() {
    this.setEditVenueModal()
    if(this.venue.arenaVenueImage_VenueCreation_Image == null){
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
        this.creationTimeStamp);
    }else{
      this.editCreatedVenueWithImage(this.venueID,
        this.venueName,
        this.blockName,
        this.seatingCapacity,
        this.acStatus,
        this.permissionRequired,
        this.venueLocation,
        this.venueType,
        this.intrevalTiming,
        this.venue.arenaVenueImage_VenueCreation_Image,
        this.venueObjId,
        this.convertMillisToDateTimeString(this.creationTimeStamp));
    }
    
    console.log("fetchvenue is running")
    this.fetchVenue();
    console.log("finished fetch")
    this.filteredVenues = [...this.venues]
  }

  errorCreateVenue(){

    this.errorVenueCreation=true
    setTimeout(()=>{
      this.errorVenueCreation = false;
    },3000)

    if (this.activeItem === '') { // Only show error if no venue type is selected
      this.errorVenueType = true;
      setTimeout(() => {
        this.errorVenueType = false;
      }, 3000);
    }
    console.log(this.errorVenueType);
    this.errorEnteringVenueType= true;
   
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 640; 
  }

  if(editpage:false){
  this.fetchVenue();
  }

  fetchVenue(): void {  
    this.dashboardService.getVenue().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.venues = response.responseData.data.map((venue: any) => ({
            venueID: venue.arenaVenueId_VenueCreation_Text,
            venueName: venue.arenaVenueName_VenueCreation_Text,
            blockName: venue.arenaBlockName_VenueCreation_Text,
            seatingCapacity:venue.arenaSeatingCapacityOfVenue_VenueCreation_Int,
            acStatus:venue.arenaIsVenueAirConditionedOrNot_VenueCreation_Text,
            permissionRequired:venue.arenaIsPermissionRequiredForAuditorium_VenueCreation_Text,
            venueLocation: venue.arenaVenueLocation_VenueCreation_Text,
            venueType: venue.arenaTypeOfVenue_VenueCreation_Text,
            intrevalTiming:venue.arenaIntervalTiming_VenueCreation_Bool,
            venueImage: venue.arenaVenueImage_VenueCreation_Image,
            venueObjId:venue._id,
            creationTimeStamp:venue.arenaVenueCreationTimeStamp_VenueCreation_DateTime,
          }));
          console.log('Mapped Cards:', this.venues);
          this.filteredVenues = [...this.venues]

        } else {
          console.error('Invalid or empty API response:', response);
          this.venues = [];
          this.filteredVenues=[];

        }
      },
      (error) => {
        console.error('Error fetching venue slots:', error);
        this.venues = [];
      }
    );
  }

  
  filterVenues() {
    if (!this.searchText) {
      this.filteredVenues = [...this.venues]; // If search is empty, show all venues
    } else {
      this.filteredVenues = this.venues.filter(venue =>
        venue.venueName.toLowerCase().startsWith(this.searchText.toLowerCase()) ||
        venue.blockName.toLowerCase().startsWith(this.searchText.toLowerCase()) ||
        venue.venueLocation.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    }
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

  editCreatedVenueWithImage(arenaVenueId_VenueCreation_text: string,
    arenaVenueName_VenueCreation_text: string,
    arenaBlockName_VenueCreation_text: string,
    arenaSeatingCapacityOfVenue_VenueCreation_Integer: number,
    arenaIsVenueAirConditionedOrNot_VenueCreation_text: string,
    arenaIsPermissionRequiredForAuditorium_VenueCreation_text: string,
    arenaVenueLocation_VenueCreation_text: string,
    arenaTypeOfVenue_VenueCreation_text: string,
    aernaIntervalTiming_VenueCreation_boolean: boolean,
    arenaVenueImage_VenueCreation_Image:File,
    arena_VenueObjectId_UpdateVenue_Text:string,
    arenaVenueCreationTimeStamp_VenueCreation_DateTime: string): void {  
    this.dashboardService.editVenueWithImage(arenaVenueId_VenueCreation_text, arenaVenueName_VenueCreation_text, arenaBlockName_VenueCreation_text,
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

  closeEditPage(){
    console.log("hi")
    this.editpage = false;
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
    creationTimeStamp: string;
    venueImagePath: string}){
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
        this.venueImagePath = event.venueImagePath;
  }

  getBookings(fromDate: string, toDate: string): void {  
    this.dashboardService.getBookings(fromDate,toDate).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.bookings = response.responseData.data.map((booking: any) => ({
            BookingId: booking.arenaBookingId_UserBooking_Text,
            venueId: booking.arena_venueIdCounter_UserBooking_Text,
            venueName: booking.arena_SpotName_UserBooking_Text,
            eventDate: new Date(booking.arenaEventDate_UserBooking_Date).toLocaleDateString(),
            bookedBy: booking.arenaBookedToUserName_UserBooking_Text,
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

  getCancelledBookings(fromDate: string, toDate: string): void {  
    this.dashboardService.getCancelledBookings(fromDate,toDate).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.cancelledBookings = response.responseData.data.map((booking: any) => ({
            BookingId: booking.arenaBookingId_UserBooking_Text,
            venueName: booking.arena_SpotName_UserBooking_Text,
            eventDate: new Date(booking.arenaEventDate_UserBooking_Date).toLocaleDateString(),
            cancelledDate: new Date(booking.arenaCancelledBookingTimestamp_UserBooking_DateTime).toLocaleDateString(),
            cancelledBy: booking.arena_CancelledBy_UserBooking_Text,
            cancelledReason: booking.arenaCancelledBookingReason_UserBooking_text,
            bookedBy: booking.arenaBookedToUserName_UserBooking_Text,
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
  
  setReportHeader(item:string){
    this.reportselector = item ;
  }



  convertMillisToDateTimeString(millis: string): string {
    // Convert string to number
    const timestamp = Number(millis);

    if (isNaN(timestamp)) {
        throw new Error("Invalid timestamp: Not a number");
    }

    const date = new Date(timestamp);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');  // Month is 0-based
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}




}
