import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HomepageService } from './homepage.service';


declare var flowbite: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DatePipe]
})
export class HomepageComponent implements OnInit {


  activeItem: string = 'All Venues'; 
  buttonName: string = 'Venue Type'; 
  selectedDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  startDate: Date | null = null;
  endDate: Date | null = null;
  isDropdownOpen: boolean = false;
  activeSection: string = 'landingpage';
  tomorrowDate: string;
  isLoading = false;
  dropdownSelected:boolean = false;
  dateSelected:boolean = false;

  requiredFieldError:boolean = false;

  

  ngOnInit(): void {
    this.initializeDatepicker();
    this.fetchVenues();
  }

  initializeDatepicker(): void {
    const datepickerElement = document.getElementById('datepicker') as HTMLInputElement;

    if (datepickerElement) {
      new flowbite.Datepicker(datepickerElement);
    }
  }

  cards: any[] = [];

  constructor(private homepageService: HomepageService)  {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }

  fetchVenues(): void {
    this.homepageService.getVenue().subscribe(
      (response: any) => {
        console.log('API Response:', response); // Debugging
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          // Map API data to cards array
          this.cards = response.responseData.data.map((venue: any) => ({
            heading: venue.arenaVenueName_VenueCreation_text,
            location: venue.arenaBlockName_VenueCreation_text,
            capacity: venue.arenaSeatingCapacityOfVenue_VenueCreation_Integer,
            acstatus: venue.arenaIsVenueAirConditionedOrNot_VenueCreation_text,
            imagepath: venue.arenaVenueImage_VenueCreation_Image,
            address: venue.arenaVenueLocation_VenueCreation_text,
            venueId: venue.arenaVenueId_VenueCreation_text,
            buttons: venue.arenaTimeslots_VenueCreation_Array,
            selectedButtons: []  // Initialize selectedButtons to an empty array for each card
          }));
          console.log('Mapped Cards:', this.cards); // Debugging
        } else {
          console.error('Invalid or empty API response:', response);
          this.cards = []; // Set cards to an empty array if the response is invalid
        }
      },
      (error) => {
        console.error('Error fetching venues:', error);
        this.cards = []; // Set cards to an empty array if there's an error
      }
    );
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
  
    // After updating selectedButtons, you can call any additional actions if necessary
  }
  

  navigateToBooking() {
    this.activeSection = 'bookingpage';
  }

  navigateToHome() {
      this.activeSection = 'homepage';
  }

  landingtohome(){
    if(this.dropdownSelected && this.dateSelected){
    this.isLoading = true;
    this.requiredFieldError=false;
    this.dateSelected = false;
    setTimeout(() => {
      this.activeSection = 'homepage';
      this.isLoading = false;
    }, 2000); 
  }
  else{
    this.requiredFieldError=true;
  }
  }


  setActiveItem(item: string): void {
    this.activeItem = item; 
    this.dropdownSelected = true;
  }

  setButtonName(item: string): void {
    this.buttonName = item; 
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

}
