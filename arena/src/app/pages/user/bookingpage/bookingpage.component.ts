import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})

export class BookingpageComponent implements OnInit {
  bookings = [
    { bookingid: '070125', eventname: 'Shells Inauguration', address: 'Main Block PG', venue: 'P1 Conference Hall', status: 'Scheduled' },
    { bookingid: '070126', eventname: 'Incubation Programme', address: 'Admin Block', venue: 'A2 Auditorium', status: 'Cancelled' },
    { bookingid: '070126', eventname: 'Incubation Programme', address: 'Admin Block', venue: 'Panel Room M4', status: 'Completed' },
    { bookingid: '070126', eventname: 'Incubation Programme', address: 'Admin Block', venue: 'A1 Auditorium', status: 'Completed' },
    { bookingid: '070126', eventname: 'Incubation Programme', address: 'Admin Block', venue: 'SKE Auditorium', status: 'Completed' },
    { bookingid: '070127', eventname: 'Conference', address: 'Main Block', venue: 'Conference Hall 2', status: 'Scheduled' },
    { bookingid: '070128', eventname: 'Team Meeting', address: 'Admin Block', venue: 'Meeting Room 3', status: 'Completed' },
    { bookingid: '070129', eventname: 'Workshop', address: 'Training Block', venue: 'Workshop Room 5', status: 'Scheduled' },
    { bookingid: '070130', eventname: 'Seminar', address: 'Main Block', venue: 'Seminar Hall 1', status: 'Scheduled' },
    { bookingid: '070131', eventname: 'Networking Event', address: 'Admin Block', venue: 'Networking Room', status: 'Scheduled' },
    { bookingid: '070132', eventname: 'Leadership Forum', address: 'Conference Center', venue: 'Leadership Hall', status: 'Completed' },
    { bookingid: '070133', eventname: 'Annual Gathering', address: 'Main Block', venue: 'Grand Hall', status: 'Cancelled' },
  ];

  currentPage: number = 1;  
  itemsPerPage: number = 5;  
  totalItems: number = 0;    
  paginatedBookings: any[] = [];  
  isDropdownOpen: boolean = false;
  isFilterDropdownOpen: boolean = false;
  buttonName: string = 'Venue Type'; 
  activeItem: string = 'All Venues'; 
  filterItem: string = 'All'; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.totalItems = this.bookings.length;  // Update totalItems whenever bookings are populated
    this.paginatedBookings = this.getPaginatedBookings();  // Get initial paginated bookings
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

}
