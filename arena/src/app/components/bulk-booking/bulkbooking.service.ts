import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkbookingService {

  constructor(private http: HttpClient) { }

  getVenue(): Observable<any> {
      return this.http.get('http://172.19.3.173:8089/kjusys-api/intern-project/venue-Book');
    }

  bulkBooking(arenaEventName_UserBooking_Text:string, arenaBookedSlots_UserBooking_Array:[], arenaBulkBookingFromDate_BulkBooking_Date:string,
      arenaBulkBookingToDate_BulkBooking_Date:string, arenaUserId_UserBooking_Text:string, arenaUsername_UserBooking_Text:string,
      arena_SpotName_UserBooking_Text:string, arena_VenueSpot_UserBooking_Text:string, arena_venueIdCounter_UserBooking_Text:string,
      arena_venueType_UserBooking_Text:string, arenaBulkBookingVenueObjectId_BulkBooking_Text:string
    ): Observable<any> {

      const body = {arenaEventName_UserBooking_Text, arenaBookedSlots_UserBooking_Array, arenaBulkBookingFromDate_BulkBooking_Date,
        arenaBulkBookingToDate_BulkBooking_Date, arenaUserId_UserBooking_Text, arenaUsername_UserBooking_Text, arena_SpotName_UserBooking_Text,
        arena_VenueSpot_UserBooking_Text, arena_venueIdCounter_UserBooking_Text, arena_venueType_UserBooking_Text, arenaBulkBookingVenueObjectId_BulkBooking_Text
      }; 

      return this.http.post('http://172.19.3.173:8089/kjusys-api/intern-project/bulk-Booking', body);
  } 
}
