import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkbookingService {

  constructor(private http: HttpClient) { }

  getVenue(): Observable<any> {
      return this.http.get('http://172.18.0.59:8089/kjusys-api/intern-project/venue-Book');
    }

  bulkBooking(arenaEventName_UserBooking_Text:string, arenaBookedSlots_UserBooking_Array:[], arenaBulkBookingFromDate_BulkBooking_Date:string,
      arenaBulkBookingToDate_BulkBooking_Date:string, arenaBookedByUserId_UserBooking_Text:string, arenaBookedByUserName_UserBooking_Text:string,
      arena_SpotName_UserBooking_Text:string, arena_VenueSpot_UserBooking_Text:string, arena_venueIdCounter_UserBooking_Text:string,
      arena_venueType_UserBooking_Text:string, arenaBulkBookingVenueObjectId_BulkBooking_Text:string, arenaBookedToUserId_UserBooking_Text:string, 
      arenaBookedToUserName_UserBooking_Text:string
    ): Observable<any> {

      const body = {arenaEventName_UserBooking_Text, arenaBookedSlots_UserBooking_Array, arenaBulkBookingFromDate_BulkBooking_Date,
        arenaBulkBookingToDate_BulkBooking_Date, arenaBookedByUserId_UserBooking_Text, arenaBookedByUserName_UserBooking_Text, arena_SpotName_UserBooking_Text,
        arena_VenueSpot_UserBooking_Text, arena_venueIdCounter_UserBooking_Text, arena_venueType_UserBooking_Text, arenaBulkBookingVenueObjectId_BulkBooking_Text,
        arenaBookedToUserId_UserBooking_Text, arenaBookedToUserName_UserBooking_Text
      }; 

      return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/bulk-Booking', body);
  } 
}
