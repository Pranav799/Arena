import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-all-venue-collection',
  templateUrl: './all-venue-collection.component.html',
  styleUrls: ['./all-venue-collection.component.css']
})
export class AllVenueCollectionComponent {

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
    creationTimeStamp: string) {
    this.editBooking.emit({
      venueID, venueName, blockName, seatingCapacity, acStatus,
      permissionRequired, venueLocation, venueType, intrevalTiming,
      venueImage, venueObjId, creationTimeStamp
    })
  }
  





}
