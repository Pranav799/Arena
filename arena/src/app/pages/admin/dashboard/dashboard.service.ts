import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) { }

  addVenue(venueData: any): Observable<any> {
    return this.http.post('http://172.19.3.173:8089/kjusys-api/intern-project/venue-Creation', venueData);

  }

  getVenue(): Observable<any> {
    return this.http.get('http://172.19.3.173:8089/kjusys-api/intern-project/venue-Book');
  }

  editVenue(arenaVenueId_VenueCreation_text: string,
    arenaVenueName_VenueCreation_text: string,
    arenaBlockName_VenueCreation_text: string,
    arenaSeatingCapacityOfVenue_VenueCreation_Integer: number,
    arenaIsVenueAirConditionedOrNot_VenueCreation_text: string,
    arenaIsPermissionRequiredForAuditorium_VenueCreation_text: string,
    arenaVenueLocation_VenueCreation_text: string,
    arenaTypeOfVenue_VenueCreation_text: string,
    aernaIntervalTiming_VenueCreation_boolean: boolean,
    arenaVenueImage_VenueCreation_Image:string,
    arena_VenueObjectId_UpdateVenue_Text:string,
    arenaVenueCreationTimeStamp_VenueCreation_DateTime: string): Observable<any> {
    const body = { arenaVenueId_VenueCreation_text, arenaVenueName_VenueCreation_text, arenaBlockName_VenueCreation_text,
      arenaSeatingCapacityOfVenue_VenueCreation_Integer, arenaIsVenueAirConditionedOrNot_VenueCreation_text, arenaIsPermissionRequiredForAuditorium_VenueCreation_text, arenaVenueLocation_VenueCreation_text,
      arenaTypeOfVenue_VenueCreation_text, aernaIntervalTiming_VenueCreation_boolean, arenaVenueImage_VenueCreation_Image,
      arena_VenueObjectId_UpdateVenue_Text, arenaVenueCreationTimeStamp_VenueCreation_DateTime
     }; 
    return this.http.post('http://172.19.3.173:8089/kjusys-api/intern-project/update-Venues', body);
  }

}