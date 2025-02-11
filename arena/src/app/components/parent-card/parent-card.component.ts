import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookingService } from './booking.service'

@Component({
  selector: 'app-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.css']
})
export class ParentCardComponent  {

  @Input() heading: string = '';
  @Input() location: string = '';
  @Input() capacity: number = 0;
  @Input() acstatus: string = '';
  @Input() imagepath: string = '';
  @Input() address: string = '';
  @Input() venueID: string = '';
  @Input() venuType: string = '';
  @Input() objID: string = '';
  @Input() venueLocation: string = '';
  @Input() buttons: string[] = [];
  @Input() module: string = '';
  @Input() selectedButtons: string[] = [];
  @Input() selectedDate: Date | null = null;
  @Output() buttonSelect = new EventEmitter<string>();
  @Output() bookingCompleted: EventEmitter<boolean> = new EventEmitter();

  isSelected(button: string): boolean {
    return this.selectedButtons.includes(this.getButtonLabel(button));  // Check if the button is in the selectedButtons array
  }

  onButtonSelect(button: string): void {
    this.buttonSelect.emit(this.getButtonLabel(button));  
    this.bookingDetails.arenaBookedSlots_UserBooking_Array.push(this.getButtonLabel(button));
  }

  constructor(private bookingService :BookingService){} 

  bookingDetails: {
    arenaEventName_UserBooking_Text: string;
    arenaResourcePerson_UserBooking_Text: string;
    arenaDepartmentName_UserBooking_Text: string;
    arenaEventType_UserBooking_Text: string;
    arenaAdditionalRequirements_UserBooking_TextArray: string[];
    arenaExtraRequirements_UserBooking_text: string;
    arenaIsScheduledAsPerAcademicCalendar_UserBooking_bool: boolean;
    arenaModeOfEvent_UserBooking_Text: string;
    arenaEventDate_UserBooking_Date: string;
    arenaMementoQuantity_UserBooking_Integer: number;
    arenaLaptopQuantity_UserBooking_Integer: number;
    arenaSaplingsQuantity_UserBooking_Integer: number;
    arenaBookedSlots_UserBooking_Array: string[];  
    arena_VenueSpot_UserBooking_Text: string;
    arena_SpotName_UserBooking_Text: string;
    arena_venueIdCounter_UserBooking_Text: string;
    arena_venueType_UserBooking_Text: string;
    arenaUserId_UserBooking_Text:string;
    arenaUsername_UserBooking_Text:string;
    arena_ObjectId_UserBooking_Text:string;
  } = {
    arenaEventName_UserBooking_Text: "",
    arenaResourcePerson_UserBooking_Text: "",
    arenaDepartmentName_UserBooking_Text: "",
    arenaEventType_UserBooking_Text: "",
    arenaAdditionalRequirements_UserBooking_TextArray: [],
    arenaExtraRequirements_UserBooking_text: "",
    arenaIsScheduledAsPerAcademicCalendar_UserBooking_bool: true,
    arenaModeOfEvent_UserBooking_Text: "",
    arenaEventDate_UserBooking_Date: "",
    arenaMementoQuantity_UserBooking_Integer: 0,
    arenaLaptopQuantity_UserBooking_Integer: 0,
    arenaSaplingsQuantity_UserBooking_Integer: 0,
    arenaBookedSlots_UserBooking_Array: [], 
    arena_VenueSpot_UserBooking_Text: "",
    arena_SpotName_UserBooking_Text: "",
    arena_venueIdCounter_UserBooking_Text: "",
    arena_venueType_UserBooking_Text:"",
    arenaUserId_UserBooking_Text:"20cs1a4198",
    arenaUsername_UserBooking_Text:"suryansh singh",
    arena_ObjectId_UserBooking_Text:""
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
  photographySelected = false;
  choirSelected = false;
  videographySelected = false;
  lampSelected = false;
  studentReportersSelected = false;
  whiteboardSelected = false;


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
    this.bookingCompleted.emit(true);
  }

  openbookVenueModal() {
    this.bookVenueModal = true;
    this.bookingDetails.arenaEventDate_UserBooking_Date = this.formatDate(this.selectedDate) ;
    this.bookingDetails.arena_SpotName_UserBooking_Text = this.heading;
    this.bookingDetails.arena_VenueSpot_UserBooking_Text = this.address;
    this.bookingDetails.arena_venueIdCounter_UserBooking_Text = this.venueID;
    this.bookingDetails.arena_venueType_UserBooking_Text = this.venuType;
    this.bookingDetails.arena_ObjectId_UserBooking_Text = this.objID;
    this.bookingDetails.arenaBookedSlots_UserBooking_Array = this.selectedButtons;
    
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

  formatDate(date: Date | null): string {
    if (!date) return ''; 
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  bookSlot() {
    this.error = false; 
    this.openSucessBookingModal(); 
    this.closebookVenueModal();
    this.bookingService.bookVenue(this.bookingDetails).subscribe(
      response => {
        if (response.status === 201) {
          console.log('Venue booked successfully');
        }
      },
      error => {
        console.error('Error booking venue', error);
      }
    );
    
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

  updateAdditionalRequirements() {
    const requirements: string[] = [];

    if (this.photographySelected) requirements.push("Photography");
    if (this.choirSelected) requirements.push("Choir");
    if (this.videographySelected) requirements.push("Videography");
    if (this.lampSelected) requirements.push("Lamp");
    if (this.studentReportersSelected) requirements.push("Student Reporters");
    if (this.whiteboardSelected) requirements.push("Whiteboard");

    if (this.saplingsSelected && this.saplingsQuantity > 0) {
        requirements.push(`Saplings`);
    }

    if (this.mementosSelected && this.mementosQuantity > 0) {
        requirements.push(`Mementos`);
    }

    if (this.laptopsSelected && this.laptopQuantity > 0) {
        requirements.push(`Laptop`);
    }

    // Update the bookingDetails object
    this.bookingDetails.arenaAdditionalRequirements_UserBooking_TextArray = requirements;
  }
}

  


