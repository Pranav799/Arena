import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent {

  @Input() bookingid : number = 0;
  bookingdate: Date = new Date();
  eventdate: Date = new Date();
  @Input() eventname : string = '';
  @Input() address : string = '';
  @Input() venue : string = '';
  @Input() status : string = '';


}
