import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DatePipe]
})
export class HomepageComponent {

  activeItem: string = 'All Venues'; 
  buttonName: string = 'Venue Type'; 
  selectedDate: string = '';
  isDropdownOpen: boolean = false;



  cards = [
    { 
      heading: 'Meeting Room', 
      location: 'PG Block', 
      capacity: 11, 
      acstatus: 'AC', 
      imagepath: 'assets/images/audi4.jpg', 
      address: '2nd Floor PG Block', 
      buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
    , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
  ], 
      selectedButtons: [] as string[] 
    },
    { 
      heading: 'P2 Conference Hall', 
      location: 'Humanities Block', 
      capacity: 180, 
      acstatus: 'AC', 
      imagepath: 'assets/images/audi3.jpg', 
      address: '1st Floor Humanities Block', 
      buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
    , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
  ], 
      selectedButtons: [] as string[] 
    },
    { 
      heading: 'Meeting Room', 
      location: 'PG Block', 
      capacity: 11, 
      acstatus: 'AC', 
      imagepath: 'assets/images/audi4.jpg', 
      address: '2nd Floor PG Block', 
      buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
        , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
      ], 
      selectedButtons: [] as string[]
    },
  ];

  constructor(private router: Router, private datePipe: DatePipe)  {}

  onButtonSelect(cardIndex: number, button: string): void {

    this.cards.forEach((card, index) => {
      if (index !== cardIndex) {
        card.selectedButtons = [];       }
    });

    const selectedButtons = this.cards[cardIndex].selectedButtons;
    const buttonIndex = selectedButtons.indexOf(button);
    if (buttonIndex === -1) {
      selectedButtons.push(button);
    } else {
      selectedButtons.splice(buttonIndex, 1);
    }
  }

  navigateToBooking() {
    this.router.navigate(['/booking']);
  }

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
    // Format the selected date
    if (this.selectedDate) {
      this.selectedDate = this.datePipe.transform(this.selectedDate, 'dd MMM yyyy')!;
    }
    console.log('Formatted Date:', this.selectedDate);
    this.closeDatePicker();
  }


  closeDatePicker(): void {
    const datepickerElement = document.getElementById('default-datepicker');
    if (datepickerElement) {
      datepickerElement.blur();
    }
  }

}
