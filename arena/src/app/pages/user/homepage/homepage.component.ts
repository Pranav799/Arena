import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


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
  isDropdownOpen: boolean = false;
  activeSection: string = 'landingpage';
  tomorrowDate: string;
  isLoading = false;

  

  ngOnInit(): void {
    this.initializeDatepicker();
  }

  initializeDatepicker(): void {
    const datepickerElement = document.getElementById('datepicker') as HTMLInputElement;

    if (datepickerElement) {
      new flowbite.Datepicker(datepickerElement);
    }
  }

  cards = [
    { 
      heading: 'Meeting Room', 
      location: 'PG Block', 
      capacity: 11, 
      acstatus: 'AC', 
      imagepath: 'assets/images/audi1.jpg', 
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
    { 
      heading: 'Meeting Room', 
      location: 'PG Block', 
      capacity: 11, 
      acstatus: 'AC', 
      imagepath: 'assets/images/10.jpg', 
      address: '2nd Floor PG Block', 
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
      imagepath: 'assets/images/audi5.webp', 
      address: '2nd Floor PG Block', 
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
      imagepath: 'assets/images/audi6.jpeg', 
      address: '2nd Floor PG Block', 
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
      imagepath: 'assets/images/audi7.webp', 
      address: '2nd Floor PG Block', 
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
      imagepath: 'assets/images/audi8.jpg', 
      address: '2nd Floor PG Block', 
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
      imagepath: 'assets/images/audi9.jpeg', 
      address: '2nd Floor PG Block', 
      buttons: ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'
        , '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'
      ], 
      selectedButtons: [] as string[]
    },
  ];

  constructor()  {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }

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
    this.activeSection = 'bookingpage';
  }

  navigateToHome() {
      this.activeSection = 'homepage';
  }

  landingtohome(){
    this.isLoading = true;
    setTimeout(() => {
      this.activeSection = 'homepage';
      this.isLoading = false;
    }, 2000); 
  }


  setActiveItem(item: string): void {
    this.activeItem = item; 
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
    }
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 1054; 
  }

}
