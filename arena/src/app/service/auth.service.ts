import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/user'; // JSON Server API URL

  constructor(private http: HttpClient) { }

  // Validate user credentials
  validateUser(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      params: { email, password }
    });
  }

  // Check if the user is authenticated (check if token exists in localStorage)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');  // Check if authToken exists in localStorage
    return token !== null;
  }

  // Log in the user (save the token and userType in localStorage)
  login(token: string, userType: string): void {
    localStorage.setItem('authToken', token);  // Save token in localStorage
    localStorage.setItem('userType', userType); // Save userType in localStorage
  }

  // Log out the user (remove the token and userType from localStorage)
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
  }

  // Get userType from localStorage
  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }
}
