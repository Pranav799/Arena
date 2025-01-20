import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  activeItem: string = 'All Venues'; 
  buttonName: string = 'Venue Type'; 

  selectedDate: any;

  isDropdownOpen: boolean = false;
  
  constructor(private router: Router) {}
  
  navigateToBooking() {
    this.router.navigate(['/booking']);
  }

  badges: string[] = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
    , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
  ];

  setActiveItem(item: string): void {
    this.activeItem = item; 
  }

  setButtonName(item: string): void {
    this.buttonName = item; 
  }
  
  setDropdown(isOpen: boolean): void {
    this.isDropdownOpen = isOpen;
  }

  onDateChange(): void {
    console.log('Selected Date:', this.selectedDate); 
    this.closeDatePicker(); 
  }

  closeDatePicker(): void {
    const datepickerElement = document.getElementById('default-datepicker');
    if (datepickerElement) {
      datepickerElement.blur(); 
    }
  }

}
