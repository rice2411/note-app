import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';
import { AuthTypeDefs } from './auth.typedefs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private cookieService: CookieService,
    private router: Router,
    private grapqlService: GraphqlService
  ) {}
  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        const user = result.user._delegate;
        const token = user.accessToken;
        const query = AuthTypeDefs.newAuthor;
        const params = {
          uid: user.uid,
          name: user.displayName,
        };
        const newUser = {
          uid: user.uid,
        };
        this.grapqlService.request(query, params).subscribe();
        this.cookieService.set('user', JSON.stringify(newUser));
        this.cookieService.set('accessToken', token);
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  logout() {
    return this.afAuth.signOut().then(() => {
      this.cookieService.delete('accessToken');
      this.cookieService.delete('user');
      this.router.navigate(['/login']);
    });
  }
}
