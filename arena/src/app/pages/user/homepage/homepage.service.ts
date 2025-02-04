import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  getVenue(): Observable<any> {
    return this.http.get('http://172.18.0.59:8089/kjusys-api/intern-project/venue-Book');
  }
}



