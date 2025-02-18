import { Component, OnInit } from '@angular/core';
import { BulkbookingService } from './bulkbooking.service';

@Component({
  selector: 'app-bulk-booking',
  templateUrl: './bulk-booking.component.html',
  styleUrls: ['./bulk-booking.component.css']
})
export class BulkBookingComponent {

  buttonName: string = 'Venue Type'; 
  isDropdownOpen = false;
  activeItem: string = 'All Venues'; 
  sucessBookingModal:boolean = false;
  isDataAvailable: boolean = false;
  bookingError: boolean = false;
  filteredVenues: any[] = []; 
  searchText: string = '';

  tomorrowDate: string;
  dayAfterTomorrowDate: string;
  

  eventName: string = '';
  bookedSlots: [] = [];
  startDate: string = '';
  endDate: string = '';
  userID: string = '20cs1a4198';
  userName: string ='suryansh singh';
  spotName: string = '';
  venueSpot:string = '';
  venueIdCounter:string='';
  venueType:string='';
  venueobjID:string='';

  venues: any[] = [];


  

  constructor(private bulkbookingService: BulkbookingService)  {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    this.dayAfterTomorrowDate = dayAfterTomorrow.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.fetchVenue();
    console.log("filterd venues"+this.filteredVenues)
  }

  setDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setButtonName(item: string): void {
    this.buttonName = item; 
  }

  closeSucessBookingModal(){
    this.sucessBookingModal = false;
  }

  closeErrorBookingModal(){
    this.bookingError = false;
  }

  openSucessBookingModal(){
    console.log("function Triggered");
    this.bulkBook(this.eventName, this.bookedSlots, this.startDate, this.endDate, this.userID, this.userName, this.spotName, this.venueSpot, this.venueIdCounter, this.venueType, this.venueobjID);
  }

  setStartDate(event: Event): void {
    const startdate = event.target as HTMLInputElement;
    const selectedStartdate = startdate.value;  

    if (selectedStartdate) {
      this.startDate = this.formatDate(new Date(selectedStartdate));
      console.log(this.startDate)
    }
  }

  setToDate(event: Event): void {
    const enddate = event.target as HTMLInputElement;
    const selectedEnddate = enddate.value;  

    if (selectedEnddate) {
      this.endDate = this.formatDate(new Date(selectedEnddate));
      console.log(this.endDate)
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return ''; 
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  selectVenue(venue: string, Slots:[], spot:string, venueID:string, type:string, objID:string ): void {
    this.buttonName = venue; 
    this.bookedSlots = Slots;
    this.spotName = venue;
    this.venueSpot= spot;
    this.venueIdCounter= venueID;
    this.venueType= type;
    this.venueobjID = objID;
    this.setDropdown();

  }

  fetchVenue(): void {  
    this.bulkbookingService.getVenue().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.venues = response.responseData.data.map((venue: any) => ({
            bookedSlots: venue.arenaTimeslots_VenueCreation_Array.map((slot: Record<string, boolean>) => Object.keys(slot)[0]), 
            spotName: venue.arenaVenueName_VenueCreation_text,
            venueSpot: venue.arena_VenueSpot_UserBooking_Text,
            venueId: venue.arenaVenueId_VenueCreation_text,
            venueType: venue.arenaTypeOfVenue_VenueCreation_text,
            venueObjID:venue._id,

            blockName: venue.arenaBlockName_VenueCreation_text,
            imagepath: venue.arenaVenueImage_VenueCreation_Image,
            address: venue.arenaVenueLocation_VenueCreation_text,
            
          }));
          console.log('Mapped Cards:', this.venues);
          this.isDataAvailable = true;
          this.filteredVenues = [...this.venues];
          console.log("filterd venues"+this.filteredVenues)
        } else {
          console.error('Invalid or empty API response:', response);
          this.venues = [];
          this.isDataAvailable = false;
        }
      },
      (error) => {
        console.error('Error fetching venue slots:', error);
        this.venues = [];
      }
    );
  }

  bulkBook(arenaEventName_UserBooking_Text:string, arenaBookedSlots_UserBooking_Array:[], arenaBulkBookingFromDate_BulkBooking_Date:string,
    arenaBulkBookingToDate_BulkBooking_Date:string, arenaUserId_UserBooking_Text:string, arenaUsername_UserBooking_Text:string,
    arena_SpotName_UserBooking_Text:string, arena_VenueSpot_UserBooking_Text:string, arena_venueIdCounter_UserBooking_Text:string,
    arena_venueType_UserBooking_Text:string, arenaBulkBookingVenueObjectId_BulkBooking_Text:string){

      this.bulkbookingService.bulkBooking(arenaEventName_UserBooking_Text, arenaBookedSlots_UserBooking_Array, arenaBulkBookingFromDate_BulkBooking_Date,
        arenaBulkBookingToDate_BulkBooking_Date, arenaUserId_UserBooking_Text, arenaUsername_UserBooking_Text, arena_SpotName_UserBooking_Text,
        arena_VenueSpot_UserBooking_Text, arena_venueIdCounter_UserBooking_Text, arena_venueType_UserBooking_Text, arenaBulkBookingVenueObjectId_BulkBooking_Text).subscribe(
          (response: any) => {
            // console.log("hi hello"+response);
    
            if (response?.statusCode === 200) {
              console.log("sucess")
              this.sucessBookingModal = true;
            } else {
              console.log("error")
              this.bookingError = true;
              console.log(response?.statusCode)
            }
          },
          (error) => {
            // console.log(error);
            this.bookingError = true; 
          }
        );
  }

  filterVenues() {
    if (!this.searchText) {
      this.filteredVenues = [...this.venues]; // If search is empty, show all venues
    } else {
      this.filteredVenues = this.venues.filter(venue =>
        venue.spotName.toLowerCase().startsWith(this.searchText.toLowerCase()) 
      );
    }
  }

}
