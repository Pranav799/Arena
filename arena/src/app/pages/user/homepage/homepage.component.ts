import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HomepageService } from './homepage.service';

declare var flowbite: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DatePipe],
  styles: [`
    @keyframes slideInFromLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `]
})
export class HomepageComponent implements OnInit {


  activeItem: string = 'ALL VENUES'; 
  buttonName: string = 'ALL VENUES'; 
  selectedDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  Date: Date | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  isDropdownOpen: boolean = false;
  activeSection: string = 'landingpage';
  tomorrowDate: string;
  isLoading = false;
  isSearching = false;
  dropdownSelected:boolean = false;
  dateSelected:boolean = false;
  requiredFieldError:boolean = false;
  isDataAvailable: boolean = false;
  othersBookings: boolean = false;

  
  ngOnInit(): void {}
  cards: any[] = [];
  othersbookings: any[] = [];

  constructor(private homepageService: HomepageService)  {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }
  
  onButtonSelect(index: number, selectedButton: string): void {
    if (!this.cards[index].selectedButtons) {
      this.cards[index].selectedButtons = [];
    }
    const buttonIndex = this.cards[index].selectedButtons.indexOf(selectedButton);
    if (buttonIndex === -1) {
      this.cards[index].selectedButtons.push(selectedButton); 
    } else {
      this.cards[index].selectedButtons.splice(buttonIndex, 1); 
    }
  }
  
  navigatePages(page: string) {
    this.activeSection = page;
    this.fetchVenue(this.formatDate(this.selectedDate),this.activeItem);
    this.othersBookings=false;
    this.isSearching = true;
    setTimeout(() => {
      this.isSearching = false;
    }, 2000); 
  }

  landingtohome(){
    if(this.dateSelected){
    this.isLoading = true;
    this.requiredFieldError=false;
    this.dateSelected = false;
    this.activeItem = this.buttonName; 
    this.Date = this.selectedDate;

    this.fetchVenue(this.formatDate(this.selectedDate),this.activeItem);

    setTimeout(() => {
      this.activeSection = 'homepage';
      this.isLoading = false;
    }, 2000); 
  }
  else{
    this.requiredFieldError=true;
  }
  }

  searchforVenue(){
    this.isSearching = true;
    this.requiredFieldError=false;
    this.dateSelected = false;
    this.activeItem = this.buttonName; 
    this.Date = this.selectedDate;

    this.fetchVenue(this.formatDate(this.selectedDate),this.activeItem);

    setTimeout(() => {
      this.activeSection = 'homepage';
      this.isSearching = false;
    }, 2000); 
  }

  onBookingCompleted(success: boolean, venueID: string) {
    if (success) {
     this.fetchVenue(this.formatDate(this.selectedDate),this.activeItem);
    } else {
      console.log('Booking failed. No API call made.');
    }
  }

  viewOthersBooking(event: { userID: string; venueObID: string; bookingDate: Date | null }) {
    const date:string = this.formatDate(event.bookingDate);
    this.viewotherUsersbooking(event.venueObID, event.userID, date)
  }
  
  selectVenue(item: string): void {
    this.dropdownSelected = true;
    this.buttonName = item; 
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDateString = input.value;  
    if (selectedDateString) {
      this.selectedDate = new Date(selectedDateString);  
      console.log('Selected Date:', this.selectedDate); 
      this.dateSelected = true;
    }
  }

  setStartDate(event: Event): void {
    const startdate = event.target as HTMLInputElement;
    const selectedStartdate = startdate.value;  

    if (selectedStartdate) {
      this.startDate = new Date(selectedStartdate);
    }
  }

  setEndDate(event: Event): void {
    const enddate = event.target as HTMLInputElement;
    const selectedEnddate = enddate.value;

    if (selectedEnddate) {
      this.endDate = new Date(selectedEnddate);
    }
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 1054; 
  }

  fetchVenue(selectedDate: string, activeItem: string): void { 
    this.isSearching = true; 
    this.homepageService.getVenue(selectedDate, activeItem).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.cards = response.responseData.data.map((venue: any) => ({
            heading: venue.arenaVenueName_VenueCreation_Text,
            location: venue.arenaBlockName_VenueCreation_Text,
            capacity: venue.arenaSeatingCapacityOfVenue_VenueCreation_Int,
            acstatus: venue.arenaIsVenueAirConditionedOrNot_VenueCreation_Text,
            imagepath: venue.arenaVenueImage_VenueCreation_Image,
            address: venue.arenaVenueLocation_VenueCreation_Text,
            venueId: venue.arenaVenueId_VenueCreation_Text,
            venueObjID:venue._id,
            typeOfVenue: venue.arenaTypeOfVenue_VenueCreation_Text,
            venueLocation: venue.arenaVenueLocation_VenueCreation_Text,
            buttons: venue.arenaTimeslots_VenueCreation_Array,
            permissionRequired:venue.arenaIsPermissionRequiredForAuditorium_VenueCreation_Text
          }));
          console.log('Mapped Cards:', this.cards);
          this.isDataAvailable = true;
          this.isSearching = false;
        } else {
          console.error('Invalid or empty API response:', response);
          this.cards = [];
          this.isSearching = false;
          this.isDataAvailable = false;
        }
      },
      (error) => {
        console.error('Error fetching venue slots:', error);
        this.cards = [];
      }
    );
  }

  viewotherUsersbooking(arenaOthersBookingVenueObjectId_OthersBooking_Text: string, arenaOthersBookingUserId_OthersBooking_Text: string, 
    arenaOthersBookingDate_OthersBooking_Date: string): void {  
    this.homepageService.viewOThersBooking(arenaOthersBookingVenueObjectId_OthersBooking_Text, arenaOthersBookingUserId_OthersBooking_Text, arenaOthersBookingDate_OthersBooking_Date).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.othersbookings = response.responseData.data.map((booking: any) => ({
            userName: booking.arenaBookedToUserName_UserBooking_Text,
            phoneNumber: booking.arena_UserPhoneNumber_UserBooking_Text,
            department: booking.arenaDepartmentName_UserBooking_Text,
            eventName: booking.arenaEventName_UserBooking_Text,
            timeSlots: booking.arenaBookedSlots_UserBooking_Array,
          }));
          console.log('Mapped Cards:', this.othersbookings);
          this.othersBookings = true;
        } else {
          console.error('Invalid or empty API response:', response);
          this.othersbookings = [];
          this.othersBookings = false;

        }
      },
      (error) => {
        console.error('Error fetching venue slots:', error);
        this.othersbookings = [];
        this.othersBookings = false;

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
