import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BookingService } from '../parent-card/booking.service';

@Component({
  selector: 'app-all-venue-collection',
  templateUrl: './all-venue-collection.component.html',
  styleUrls: ['./all-venue-collection.component.css']
})
export class AllVenueCollectionComponent implements OnInit {

  @Input() venueID: string = '';
  @Input() venueName: string = '';
  @Input() blockName: string = '';
  @Input() seatingCapacity: number = 0;
  @Input() acStatus: string = '';
  @Input() permissionRequired: string = '';
  @Input() venueLocation: string = '';
  @Input() venueType: string = '';
  @Input() intrevalTiming: boolean = false;
  @Input() venueImage: string = '';
  @Input() venueObjId: string = '';
  @Input() creationTimeStamp: string = '';
  
  @Output() editBooking: EventEmitter<{ 
    venueID: string;
    venueName: string;
    blockName: string;
    seatingCapacity: number;
    acStatus: string;
    permissionRequired: string;
    venueLocation: string;
    venueType: string;
    intrevalTiming: boolean;
    venueImage: string;
    venueObjId: string;
    creationTimeStamp: string;
    venueImagePath: string;

  }> = new EventEmitter();
  
  edit(venueID: string,
    venueName: string,
    blockName: string,
    seatingCapacity: number,
    acStatus: string,
    permissionRequired: string,
    venueLocation: string,
    venueType: string,
    intrevalTiming: boolean,
    venueImage: string,
    venueObjId: string,
    creationTimeStamp: string,
    venueImagePath: string) {
    this.editBooking.emit({
      venueID, venueName, blockName, seatingCapacity, acStatus,
      permissionRequired, venueLocation, venueType, intrevalTiming,
      venueImage, venueObjId, creationTimeStamp, venueImagePath
    })
  }

  imageUrl: string = '';

  

constructor(private bookingService: BookingService) { }

ngOnInit(): void {
  this.fetchImage()
}

fetchImage() {
  this.bookingService.getImage(this.venueImage).subscribe(response => {
    this.imageUrl = URL.createObjectURL(response);
  }, error => {
    console.error('Error fetching image:', error);
  });
}


}
