import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BookingService } from './booking.service'

@Component({
  selector: 'app-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.css']
})
export class ParentCardComponent implements OnInit {

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
  @Input() permissionRequired: string = '';

  @Input() selectedDate: Date | null = null;

  userID: string = "20cs1a4198";

  @Output() bookingCompleted: EventEmitter<boolean> = new EventEmitter();
  @Output() viewOthersBooking: EventEmitter<{ userID: string; venueObID: string; bookingDate: Date | null }> = new EventEmitter();


  isSelected(button: any): boolean {
    const buttonKey = this.getButtonLabel(button); // Extract the time slot key
    return this.bookingDetails.arenaBookedSlots_UserBooking_Array.includes(buttonKey);
  }

  
  onButtonSelect(button: any): void {
    const buttonKey = this.getButtonLabel(button); // Extract time slot key
    console.log('Clicked button key:', buttonKey);
  
    if (this.isSelected(button)) {
      console.log('Removing:', buttonKey);
      this.bookingDetails.arenaBookedSlots_UserBooking_Array = 
        this.bookingDetails.arenaBookedSlots_UserBooking_Array.filter(b => b !== buttonKey);
    } else {
      console.log('Adding:', buttonKey);
      this.bookingDetails.arenaBookedSlots_UserBooking_Array.push(buttonKey);
    }
  
    console.log('Updated slots:', this.bookingDetails.arenaBookedSlots_UserBooking_Array);
  }

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.fetchImage()
  }


  bookingDetails: {
    arenaEventName_UserBooking_Text: string;
    arenaResourcePerson_UserBooking_Text: string;
    arenaDepartmentName_UserBooking_Text: string;
    arenaEventType_UserBooking_Text: string;
    arenaAdditionalRequirements_UserBooking_TextArray: string[];
    arenaExtraRequirements_UserBooking_text: string;
    arenaIsScheduledAsPerAcademicCalendar_UserBooking_bool: boolean | null;
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
    arenaBookedByUserId_UserBooking_Text: string;
    arenaBookedByUserName_UserBooking_Text: string;
    arenaBookedToUserId_UserBooking_Text: string;
    arenaBookedToUserName_UserBooking_Text: string;
    arena_ObjectId_UserBooking_Text: string;
    arena_UserEmail_UserBooking_Text: string;
    arena_UserPhoneNumber_UserBooking_Text: string;

  } = {
      arenaEventName_UserBooking_Text: "",
      arenaResourcePerson_UserBooking_Text: "",
      arenaDepartmentName_UserBooking_Text: "",
      arenaEventType_UserBooking_Text: "",
      arenaAdditionalRequirements_UserBooking_TextArray: [],
      arenaExtraRequirements_UserBooking_text: "",
      arenaIsScheduledAsPerAcademicCalendar_UserBooking_bool: null,
      arenaModeOfEvent_UserBooking_Text: "",
      arenaEventDate_UserBooking_Date: "",
      arenaMementoQuantity_UserBooking_Integer: 1,
      arenaLaptopQuantity_UserBooking_Integer: 1,
      arenaSaplingsQuantity_UserBooking_Integer: 1,
      arenaBookedSlots_UserBooking_Array: [],
      arena_VenueSpot_UserBooking_Text: "",
      arena_SpotName_UserBooking_Text: "",
      arena_venueIdCounter_UserBooking_Text: "",
      arena_venueType_UserBooking_Text: "",
      arenaBookedByUserId_UserBooking_Text: "20cs1a4198",
      arenaBookedByUserName_UserBooking_Text: "suryansh singh",
      arenaBookedToUserId_UserBooking_Text: "20cs1a4198",
      arenaBookedToUserName_UserBooking_Text: "suryansh singh",
      arena_ObjectId_UserBooking_Text: "",
      arena_UserEmail_UserBooking_Text: "23mcab34@kristujayanti.com",
      arena_UserPhoneNumber_UserBooking_Text: "83038333916"
    };

    users = [
      { userId: 101, username: "john_doe" },
      { userId: 102, username: "alice_wonder" },
      { userId: 103, username: "mike_ross" },
      { userId: 104, username: "sarah_lee" },
      { userId: 105, username: "david_smith" },
      { userId: 106, username: "emma_jones" },
      { userId: 107, username: "chris_evans" },
      { userId: 108, username: "olivia_brown" },
      { userId: 109, username: "james_bond" },
      { userId: 110, username: "linda_clark" }
    ];

    filteredUsers: any[] = []; 


  sucessBookingModal: boolean = false;
  bookVenueModal: boolean = false;
  eventName: string = '';
  imageUrl: string = '';
  searchText: string = '';
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
  showMessage: boolean = false;
  photographySelected = false;
  choirSelected = false;
  videographySelected = false;
  lampSelected = false;
  studentReportersSelected = false;
  whiteboardSelected = false;
  isDropdownOpen = false;




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

  othersBooking(userID: string, venueObID: string, bookingDate: Date | null) {
    console.log("hi" + this.selectedDate)
    this.viewOthersBooking.emit({ userID, venueObID, bookingDate });
  }

  openbookVenueModal() {
    this.bookVenueModal = true;
    this.bookingDetails.arenaEventDate_UserBooking_Date = this.formatDate(this.selectedDate);
    this.bookingDetails.arena_SpotName_UserBooking_Text = this.heading;
    this.bookingDetails.arena_VenueSpot_UserBooking_Text = this.address;
    this.bookingDetails.arena_venueIdCounter_UserBooking_Text = this.venueID;
    this.bookingDetails.arena_venueType_UserBooking_Text = this.venuType;
    this.bookingDetails.arena_ObjectId_UserBooking_Text = this.objID;
  }

  closebookVenueModal() {
    this.bookVenueModal = false;
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

  closeErrorMessage() {
    this.error = false
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 700;
  }

  setShowMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

 
  getButtonLabel(button: any): string {
    return Object.keys(button)[0]; 
  }

  getButtonValue(button: any): boolean {
    return Boolean(Object.values(button)[0]); 
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
      requirements.push(`Saplings(${this.bookingDetails.arenaSaplingsQuantity_UserBooking_Integer})`);
    }

    if (this.mementosSelected && this.mementosQuantity > 0) {
      requirements.push(`Mementos(${this.bookingDetails.arenaMementoQuantity_UserBooking_Integer})`);
    }

    if (this.laptopsSelected && this.laptopQuantity > 0) {
      requirements.push(`Laptops(${this.bookingDetails.arenaLaptopQuantity_UserBooking_Integer})`);
    }

    // Update the bookingDetails object
    this.bookingDetails.arenaAdditionalRequirements_UserBooking_TextArray = requirements;
  }

  setDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
    this.filteredUsers = [...this.users];
  }

  fetchImage() {
    this.bookingService.getImage(this.imagepath).subscribe(response => {
      this.imageUrl = URL.createObjectURL(response);
    }, error => {
      console.error('Error fetching image:', error);
    });
  }

  filterUsers() {
    console.log("Users:", this.users);
    console.log("Search Text:", this.searchText);
  
    if (!this.searchText.trim()) {
      this.filteredUsers = [...this.users]; // Reset to full list when empty
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    console.log("Filtered Users:", this.filteredUsers);
  }

  setUserDetails(bookedToUserId:string, bookedToUserUsername:string){
    this.bookingDetails.arenaBookedToUserId_UserBooking_Text = bookedToUserId;
    this.bookingDetails.arenaBookedToUserName_UserBooking_Text = bookedToUserUsername;
    this.setDropdown();
  }


}




