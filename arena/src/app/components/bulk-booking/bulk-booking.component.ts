import { Component } from '@angular/core';

@Component({
  selector: 'app-bulk-booking',
  templateUrl: './bulk-booking.component.html',
  styleUrls: ['./bulk-booking.component.css']
})
export class BulkBookingComponent {

  buttonName: string = 'Venue Type'; 
  isDropdownOpen = false;
  activeItem: string = 'All Venues'; 



  setDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setButtonName(item: string): void {
    this.buttonName = item; 
  }

}
