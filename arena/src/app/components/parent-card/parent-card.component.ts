import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookingService } from './booking.service'

@Component({
  selector: 'app-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.css']
})
export class ParentCardComponent {
  @Input() heading: string = '';
  @Input() location: string = '';
  @Input() capacity: number = 0;
  @Input() acstatus: string = '';
  @Input() imagepath: string = '';
  @Input() address: string = '';
  @Input() buttons: string[] = [];
  @Input() module: string = '';
  @Input() selectedButtons: string[] = [];
  @Input() selectedDate: Date | null = null;
  @Output() buttonSelect = new EventEmitter<string>();

  isSelected(button: string): boolean {
    return this.selectedButtons.includes(this.getButtonLabel(button));  // Check if the button is in the selectedButtons array
  }

  onButtonSelect(button: string): void {
    this.buttonSelect.emit(this.getButtonLabel(button));  // Emit selected button to the parent
  }

  constructor(private bookingService :BookingService){}

  bookingDetails = {
    arenaEventName_UserBooking_Text: "",
    arenaResourcePerson_UserBooking_Text: "",
    arenaDepartmentName_UserBooking_Text: "",
    arenaEventType_UserBooking_Text: "",
    arenaAdditionalRequirements_UserBooking_TextArray: [],
    arenaExtraRequirements_UserBooking_text: "",
    arenaIsScheduledAsPerAcademicCalendar_UserBooking_bool: true,
    arenaModeOfEvent_UserBooking_Text: "",
    arenaEventDate_UserBooking_Date: "",
    arenaVenue_UserBooking_Text: "",
    arenaMementoQuantity_UserBooking_Integer: 0,
    arenaLaptopQuantity_UserBooking_Integer: 0,
    arenaSaplingsQuantity_UserBooking_Integer: 0,
    arenaBookedSlots_UserBooking_Array: [],
    arena_VenueBooked_UserBooking_Text: "",
    arena_VenueSpot_UserBooking_Text: "",
    arena_venueIdCounter_UserBooking_Text: ""
};
  
  
  sucessBookingModal: boolean = false;
  bookVenueModal: boolean = false;
  eventName: string = '';
  chiefperson: string = '';
  department: string = '';
  eventKind: string = '';
  error: boolean = false;
  mementosSelected: boolean = false; 
  laptopsSelected: boolean = false; 
  saplingsSelected: boolean = false; 
  mementos: string = '';
  laptops: string = '';
  saplings: string = '';
  saplingsQuantity: number = 1;
  mementosQuantity: number = 1;
  laptopQuantity: number = 1;
  showMessage:boolean = false;

  onMementosChange(): void {
    this.mementos = this.mementosSelected ? 'mementos' : '';
  }

  onLaptopsChange(): void {
    this.laptops = this.laptopsSelected ? 'laptops' : '';
  }

  onSaplingsChange(): void {
    this.saplings = this.saplingsSelected ? 'saplings' : '';
  }

  openSucessBookingModal() {
    this.sucessBookingModal = true;
  }

  closeSucessBookingModal() {
    this.sucessBookingModal = false;
    // window.location.reload();
  }

  openbookVenueModal() {
    this.bookVenueModal = true;
  }

  closebookVenueModal() {
    this.bookVenueModal = false;
  }

  toggleSelection(button: string): void {
    const index = this.selectedButtons.indexOf(button);
    if (index === -1) {
      this.selectedButtons.push(button);
    } else {
      this.selectedButtons.splice(index, 1);
    }
  }

  bookSlot() {
    this.error = false; 
    this.openSucessBookingModal(); 
    this.closebookVenueModal();
    this.bookingService.bookVenue(this.bookingDetails).subscribe(response => {
      console.log('Venue booked successfully', response);
    }, error => {
      console.error('Error booking venue', error);
    });
  }

  errorBookSlot() {
    this.error = true; 
  }

  closeErrorMessage(){
    this.error=false
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 700; 
  }

  setShowMessage(){
    this.showMessage = true;  
    setTimeout(() => {
      this.showMessage = false; 
    }, 3000); 
  }

  getButtonLabel(button: any): string {
    return Object.keys(button)[0];
  }

  getButtonValue(button: any): any {
    return Object.values(button)[0];
  }

  }

  


