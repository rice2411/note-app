import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  user: any = {
    displayName: '',
    photoURL: '',
  };
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    afAuth.authState.subscribe((res) => {
      this.user.displayName = res?.displayName;
      this.user.photoURL = res?.photoURL;
    });
  }
  logout() {
    return this.authService.logout();
  }
}
