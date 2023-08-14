import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if (
      this.cookieService.get('user') &&
      JSON.parse(this.cookieService.get('user'))
    ) {
      this.router.navigate(['']);
    }
  }

  googleAuth() {
    return this.authService.googleAuth();
  }
}
