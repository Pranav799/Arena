import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAllBookings(arenaUserId_UserBooking_Text: string): Observable<any> {
    const body = { arenaUserId_UserBooking_Text}; 
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/fetching-All-Bookings', body);
  }

  cancelBooking(arenaCancelledBookingReason_UserBooking_text: string, arena_CancelledBy_UserBooking_Text: string,
    arena_CancelledById_UserBooking_Text: string, arena_BookingIdForCancellation_UserBooking_Text: string): Observable<any> {
    const body = { arenaCancelledBookingReason_UserBooking_text, arena_CancelledBy_UserBooking_Text, arena_CancelledById_UserBooking_Text,arena_BookingIdForCancellation_UserBooking_Text}; 
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/cancel-Booking', body);
  }

}
