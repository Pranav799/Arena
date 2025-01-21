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
      selectedButtons: [] as string[] // Can store multiple selected slots
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
      selectedButtons: [] as string[] // Can store multiple selected slots
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
      selectedButtons: [] as string[] // Can store multiple selected slots
    },
  ];

  selectedDate: any;

  isDropdownOpen: boolean = false;
  
  constructor(private router: Router) {}


  ngOnInit() {}

  // Handle slot selection in a card
  onButtonSelect(cardIndex: number, button: string): void {
    // Clear selected slots in all other cards
    this.cards.forEach((card, index) => {
      if (index !== cardIndex) {
        card.selectedButtons = []; // Clear selection in other cards
      }
    });

    // Toggle the selected button in the current card
    const selectedButtons = this.cards[cardIndex].selectedButtons;
    const buttonIndex = selectedButtons.indexOf(button);
    
    if (buttonIndex === -1) {
      // If the button is not already selected, add it
      selectedButtons.push(button);
    } else {
      // If the button is already selected, remove it
      selectedButtons.splice(buttonIndex, 1);
    }
  }

  
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
