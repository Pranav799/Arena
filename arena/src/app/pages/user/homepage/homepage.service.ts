import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  getVenue(arenaFetchDate_FetchVenue_Date: string, arenaFetchVenueType_FetchVenue_text: string): Observable<any> {
    const body = { arenaFetchDate_FetchVenue_Date, arenaFetchVenueType_FetchVenue_text }; 
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/fetch-Slots', body);
  }
  
}



