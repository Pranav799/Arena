import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookingService } from 'src/app/pages/user/bookingpage/booking.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent {

  @Input() bookingid : string = '';
  @Input() bookingdate: Date = new Date();
  @Input() eventdate: Date = new Date();
  @Input() eventname : string = '';
  @Input() address : string = '';
  @Input() venue : string = '';
  @Input() status : string = '';
  @Input() cancelledBy : string = '';
  @Input() cancelledDate : Date = new Date();
  @Input() cancelledReason : string = '';

  @Input() timeSlots: string[] = [];
  @Output() cancelCompleted: EventEmitter<boolean> = new EventEmitter();
  
  username:string = 'suryansh singh';
  userID:string = '20cs1a4198';
  reasonforCancelation:string = '';
  cancelBookingModal: boolean = false;
  sucessCancelBookingModal: boolean = false;
  confirmCancelBookingModal: boolean = false;
  showErrorMessage = false;
  info: boolean = false;

  

  constructor(private bookingService: BookingService) {}

  openCancelBookingModal(){
    this.cancelBookingModal = true
  }

  closeModal(){
    this.cancelBookingModal = false;
    this.confirmCancelBookingModal = true;
  }

  closeCancelBookingModal(){
    this.cancelBooking(this.reasonforCancelation, this.username, this.userID, this.bookingid)
    this.confirmCancelBookingModal = false;
    this.cancelCompleted.emit(true);
  }
  
  opensucessCancelBookingModal(){
    this.sucessCancelBookingModal = true
  }

  closesucessCancelBookingModal(){
    this.sucessCancelBookingModal = false
    this.cancelCompleted.emit(true);

  }

  cancelBooking(arenaCancelledBookingReason_UserBooking_text: string, arena_CancelledBy_UserBooking_Text: string,
    arena_CancelledById_UserBooking_Text: string, arena_BookingIdForCancellation_UserBooking_Text: string){
      this.bookingService.cancelBooking(arenaCancelledBookingReason_UserBooking_text, arena_CancelledBy_UserBooking_Text,
        arena_CancelledById_UserBooking_Text,arena_BookingIdForCancellation_UserBooking_Text).subscribe(
        (response: any) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }  
        );
  }

  openInfo(){
    this.info = !this.info;
  }


}
