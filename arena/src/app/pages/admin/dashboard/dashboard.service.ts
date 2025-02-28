import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient) { }

  addVenue(venueData: any, file?: File): Observable<any> {
    const formData = new FormData();
    Object.keys(venueData).forEach(key => {
      formData.append(key, (venueData as any)[key]);
    });
    if (file) {
      formData.append('arenaVenueImage_VenueCreation_Image', file, file.name);
    }
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/venue-Creation', formData);
  }

  getVenue(): Observable<any> {
    return this.http.get('http://172.18.0.59:8089/kjusys-api/intern-project/venue-Book');
  }

  editVenue(arenaVenueId_VenueCreation_Text: string,
    arenaVenueName_VenueCreation_Text: string,
    arenaBlockName_VenueCreation_Text: string,
    arenaSeatingCapacityOfVenue_VenueCreation_Int: number,
    arenaIsVenueAirConditionedOrNot_VenueCreation_Text: string,
    arenaIsPermissionRequiredForAuditorium_VenueCreation_Text: string,
    arenaVenueLocation_VenueCreation_Text: string,
    arenaTypeOfVenue_VenueCreation_Text: string,
    arenaIntervalTiming_VenueCreation_Bool: boolean,
    arenaVenueImage_VenueCreation_Image:string,
    arenaVenueObjectId_UpdateVenue_ObjectId:string,
    arenaVenueCreationTimeStamp_VenueCreation_DateTime: string): Observable<any> {
    const body = { arenaVenueId_VenueCreation_Text, arenaVenueName_VenueCreation_Text, arenaBlockName_VenueCreation_Text,
      arenaSeatingCapacityOfVenue_VenueCreation_Int, arenaIsVenueAirConditionedOrNot_VenueCreation_Text, arenaIsPermissionRequiredForAuditorium_VenueCreation_Text, arenaIntervalTiming_VenueCreation_Bool,
      arenaVenueLocation_VenueCreation_Text, arenaTypeOfVenue_VenueCreation_Text, arenaVenueImage_VenueCreation_Image,
      arenaVenueObjectId_UpdateVenue_ObjectId, arenaVenueCreationTimeStamp_VenueCreation_DateTime
     }; 
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/update-Venues', body);
  }

  editVenueWithImage(
    arenaVenueId_VenueCreation_Text: string,
    arenaVenueName_VenueCreation_Text: string,
    arenaBlockName_VenueCreation_Text: string,
    arenaSeatingCapacityOfVenue_VenueCreation_Int: number,
    arenaIsVenueAirConditionedOrNot_VenueCreation_Text: string,
    arenaIsPermissionRequiredForAuditorium_VenueCreation_Text: string,
    arenaVenueLocation_VenueCreation_Text: string,
    arenaTypeOfVenue_VenueCreation_Text: string,
    arenaIntervalTiming_VenueCreation_Bool: boolean,
    arenaVenueImage_VenueCreation_Image: File,
    arenaVenueObjectId_UpdateVenue_ObjectId: string,
    arenaVenueCreationTimeStamp_VenueCreation_DateTime: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append("arenaVenueId_VenueCreation_Text", arenaVenueId_VenueCreation_Text);
    formData.append("arenaVenueName_VenueCreation_Text", arenaVenueName_VenueCreation_Text);
    formData.append("arenaBlockName_VenueCreation_Text", arenaBlockName_VenueCreation_Text);
    formData.append("arenaSeatingCapacityOfVenue_VenueCreation_Int", arenaSeatingCapacityOfVenue_VenueCreation_Int.toString());
    formData.append("arenaIsVenueAirConditionedOrNot_VenueCreation_Text", arenaIsVenueAirConditionedOrNot_VenueCreation_Text);
    formData.append("arenaIsPermissionRequiredForAuditorium_VenueCreation_Text", arenaIsPermissionRequiredForAuditorium_VenueCreation_Text);
    formData.append("arenaVenueLocation_VenueCreation_Text", arenaVenueLocation_VenueCreation_Text);
    formData.append("arenaTypeOfVenue_VenueCreation_Text", arenaTypeOfVenue_VenueCreation_Text);
    formData.append("arenaIntervalTiming_VenueCreation_Bool", arenaIntervalTiming_VenueCreation_Bool.toString());
    formData.append("arenaVenueObjectId_UpdateVenue_ObjectId", arenaVenueObjectId_UpdateVenue_ObjectId);
    formData.append("arenaVenueCreationTimeStamp_VenueCreation_DateTime", arenaVenueCreationTimeStamp_VenueCreation_DateTime);
    formData.append("arenaVenueImage_VenueCreation_Image", arenaVenueImage_VenueCreation_Image);
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/edit-Venue', formData);
  }

  getBookings(arenaReportFromDate_Report_Date: string, arenaReportToDate_Report_Date:string): Observable<any> {
    const body = {arenaReportFromDate_Report_Date, arenaReportToDate_Report_Date}; 
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/booking-Reports', body);
  }

  getCancelledBookings(arenaReportFromDate_Report_Date: string, arenaReportToDate_Report_Date:string): Observable<any> {
    const body = {arenaReportFromDate_Report_Date, arenaReportToDate_Report_Date}; 
    return this.http.post('http://172.18.0.59:8089/kjusys-api/intern-project/cancelled-Reports', body);
  }

}