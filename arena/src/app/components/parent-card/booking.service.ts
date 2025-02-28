import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  bookVenue(bookingData: any): Observable<any> {
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/book-User', bookingData);
  }

  getImage(filePath: string): Observable<Blob> {
    const requestBody = {
      "arenaVenueImage_VenueCreation_Image": filePath
    };

    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/get-Image', requestBody, { responseType: 'blob' });
  }


  
}
