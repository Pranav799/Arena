import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent {

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

  currentPage = 1; 
  itemsPerPage = 5; 
  totalItems = this.bookings.length; 
  paginatedBookings = this.getPaginatedBookings();

  constructor(private router:Router){}
  navigateToHome() {
    this.router.navigate(['/home']);
  }


  getPaginatedBookings() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.bookings.slice(startIndex, startIndex + this.itemsPerPage);
  }


  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedBookings = this.getPaginatedBookings();
    }
  }

}
