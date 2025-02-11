import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from './booking.service';

interface Booking {
  bookingid: string;
  eventname: string;
  address: string;
  venue: string;
  status: string; 
  eventDate: Date;
  bookingDate: Date;
  timeSlots: string[]; 
}

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})

export class BookingpageComponent implements OnInit {

  bookings: Booking[] = []; 
  paginatedBookings: Booking[] = [];
  filteredBookings: any[] = [];

  currentPage: number = 1;  
  itemsPerPage: number = 5;  
  totalItems: number = 0;    

  isDropdownOpen: boolean = false;
  isFilterDropdownOpen: boolean = false;

  buttonName: string = 'Venue Type'; 
  activeItem: string = 'All Venues'; 
  filterItem: string = 'All'; 
  userID:string = "20cs1a4198";
  startDate: string  = ''  
  endDate: string  = ''  
  isSearching = false;
  searchTerm: string = '';


  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit() {

    this.isSearching = true;
    setTimeout(() => {
      this.isSearching = false;
    }, 2000); 

    this.fetchBooking(this.userID)
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    let startPage = Math.max(1, this.currentPage - 1);  
    let endPage = Math.min(totalPages, this.currentPage + 1); 
    if (this.currentPage === 1) {
      endPage = Math.min(3, totalPages);  
    }
    if (this.currentPage === totalPages) {
      startPage = Math.max(totalPages - 2, 1);  
    }
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  setStartDate(event: Event): void {
    this.startDate = (event.target as HTMLInputElement).value;
    console.log('Start Date:', this.startDate); 
  }
  
  setEndDate(event: Event): void {
    this.endDate = (event.target as HTMLInputElement).value;
    console.log('End Date:', this.endDate); 
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setDropdown(isOpen: boolean): void {
    this.isDropdownOpen = isOpen;
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
            address: bookings.arena_VenueSpot_UserBooking_Text,
            venue: bookings.arena_SpotName_UserBooking_Text,
            status: bookings.arenaStatus_UserBoooking_Text, 
            eventDate: new Date(bookings.arenaEventDate_UserBooking_Date), 
            bookingDate: new Date(bookings.arenaBookingDateAndTime_UserBooking_DateTime),
            timeSlots: bookings.arenaStatus_UserBoooking_Text === "Cancelled"
              ? bookings.arenaCancelledSlots_UserBooking_Array
              : bookings.arenaBookedSlots_UserBooking_Array
          }));
          console.log('Mapped Bookings:', this.bookings);
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

  filterBookings(): void {
    let filteredList = [...this.bookings]; 

    if (this.searchTerm) {
      filteredList = filteredList.filter(booking => 
        booking.venue.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filter based on venue
      );
    }

    if (this.filterItem && this.filterItem !== 'All') {
      filteredList = filteredList.filter(booking => booking.status === this.filterItem);
    }

    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      end.setHours(23, 59, 59, 999); 

      filteredList = filteredList.filter(booking => {
        const eventDate = new Date(booking.eventDate);
        return eventDate >= start && eventDate <= end;
      });
    }

    console.log('Filtered Bookings:', filteredList); 
    this.totalItems = filteredList.length;
    this.bookings = filteredList;
    this.paginatedBookings = this.getPaginatedBookings();  // Update paginated bookings after filter
  }

  setFilterItem(filter: string): void {
    this.filterItem = filter;
    this.filterBookings();
  }

  setFilterDropdown(isOpen: boolean): void {
    this.isFilterDropdownOpen = isOpen;
  }

  getPaginatedBookings(): Booking[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.bookings.slice(startIndex, endIndex);
}

onSearchChange(): void {
  this.filterBookings(); 
}

}
