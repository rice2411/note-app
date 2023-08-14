import {
  AfterContentInit,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../service/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FolderService } from '../../service/folder/folder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  folders: any[] = [];
  isLoading: boolean = true;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    if (
      !this.cookieService.get('accessToken') ||
      !this.cookieService.get('user')
    ) {
      this.router.navigate(['/login']);
    } else {
      this.isLoading = false;
    }
  }

  logout() {
    return this.authService.logout();
  }
}
