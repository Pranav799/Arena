import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Check if email and password are empty
    if (!this.email || !this.password) {
      this.errorMessage = 'le';
      return;
    }
  
    this.authService.validateUser(this.email, this.password).subscribe(
      (users) => {
        if (users.length > 0) {
          // Login successful
          alert('Login successful');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'wp';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
        console.error(error);
      }
    );
  }
  
 

}
