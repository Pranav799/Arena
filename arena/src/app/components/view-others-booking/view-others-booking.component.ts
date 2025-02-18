import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-others-booking',
  templateUrl: './view-others-booking.component.html',
  styleUrls: ['./view-others-booking.component.css']
})
export class ViewOthersBookingComponent {

@Input() name:string = "";
@Input() phoneNumber:string = "";
@Input() department:string = "";
@Input() eventName:string = "";
@Input() timeSlots:any[] = [];

}
