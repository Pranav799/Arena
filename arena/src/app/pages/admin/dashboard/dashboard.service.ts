import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) { }

  addVenue(venueData: any): Observable<any> {
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/venue-Creation', venueData);

  }

}