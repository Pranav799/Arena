import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = 'http://localhost:3000/venues'; // API URL for JSON server

  constructor(private http: HttpClient) {}

  // Method to add a new venue
  addVenue(venueData: any): Observable<any> {
    return this.http.post(this.apiUrl, venueData);
  }
}
