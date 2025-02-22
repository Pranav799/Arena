import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  bookVenue(bookingData: any): Observable<any> {
    return this.http.post('http://172.19.3.173:8089/kjusys-api/intern-project/book-User', bookingData);

  }
}
