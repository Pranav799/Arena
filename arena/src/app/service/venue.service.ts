import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VenueService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API URL for JSON server

  constructor(private http: HttpClient) {}

  // Method to add a new venue
  addVenue(venueData: any): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
