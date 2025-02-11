import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})

export class BookingpageComponent implements OnInit {

  bookings = [];
  filteredBookings: any[] = [];
  currentPage: number = 1;  
  itemsPerPage: number = 5;  
  totalItems: number = 0;    
  paginatedBookings: any[] = [];  
  isDropdownOpen: boolean = false;
  isFilterDropdownOpen: boolean = false;
  buttonName: string = 'Venue Type'; 
  activeItem: string = 'All Venues'; 
  filterItem: string = 'All'; 
  userID:string = "20cs1a4198";

  fromDate: string = '';  
  toDate: string = '';
  

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchBooking(this.userID)
  }

  // Calculate total pages based on totalItems and itemsPerPage
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Generate page numbers dynamically to show only 3 pages at a time
  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    let startPage = Math.max(1, this.currentPage - 1);  // Start at current page minus 1, but at least 1
    let endPage = Math.min(totalPages, this.currentPage + 1);  // End at current page plus 1, but at most totalPages

    // If we're near the beginning, shift the range to start from 1
    if (this.currentPage === 1) {
      endPage = Math.min(3, totalPages);  // Show up to 3 pages
    }
    
    // If we're near the end, shift the range to end at totalPages
    if (this.currentPage === totalPages) {
      startPage = Math.max(totalPages - 2, 1);  // Show up to 3 pages from the end
    }

    // Generate page numbers
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Get the bookings for the current page
  getPaginatedBookings() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.bookings.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Method for going to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  // Method for going to the next page
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  // Method for setting the current page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  // Navigate to the home page
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setFilterItem(item: string): void {
    this.filterItem = item; 
  }

  setDropdown(isOpen: boolean): void {
    this.isDropdownOpen = isOpen;
  }

  setFilterDropdown(isOpen: boolean): void {
    this.isFilterDropdownOpen = isOpen;
  }
  
  setButtonName(item: string): void {
    this.buttonName = item; 
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 640; 
  }

  onCancelCompletion(success: boolean, venueID: string) {
    if (success) {
     this.fetchBooking(this.userID);
    } else {
      console.log('Booking Cancellation Failed');
    }
  }

  fetchBooking(userID: string): void {  
    this.bookingService.getAllBookings(userID).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response?.statusCode === 200 && response?.responseData?.data?.length > 0) {
          this.bookings = response.responseData.data.map((bookings: any) => ({
            bookingid: bookings.arenaBookingId_UserBooking_Text,
            eventname: bookings.arenaEventName_UserBooking_Text,
            address:bookings.arena_VenueSpot_UserBooking_Text,
            venue:bookings.arena_SpotName_UserBooking_Text,
            status:bookings.arenaStatus_UserBoooking_Text,
            eventDate:bookings.arenaEventDate_UserBooking_Date,
            bookingDate:bookings.arenaBookingDateAndTime_UserBooking_DateTime,
            timeSlots: bookings.arenaStatus_UserBoooking_Text === "Cancelled"
              ? bookings.arenaCancelledSlots_UserBooking_Array
              : bookings.arenaBookedSlots_UserBooking_Array
          }));
          console.log('Mapped All Bookings:', this.bookings);
          this.totalItems = this.bookings.length;
          this.paginatedBookings = this.getPaginatedBookings();
        } else {
          console.error('Invalid or empty API response:', response);
          this.bookings = [];
        }
      },
      (error) => {
        console.error('Error fetching venue bookings:', error);
        this.bookings = [];
      }
    );
  }

}
