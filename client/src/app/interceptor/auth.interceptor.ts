import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('accessToken');
    this.afAuth.onIdTokenChanged((res: any) => {
      try {
        const user = res?._delegate;
        if (user?.uid) {
          const newUser = {
            uid: user.uid,
          };
          this.cookieService.set('accessToken', user.accessToken);
          this.cookieService.set('user', JSON.stringify(newUser));
        } else {
          this.cookieService.delete('accessToken');
          this.cookieService.delete('user');
          this.router.navigate(['/login']);

          return;
        }
      } catch (err) {
        this.toastr.error('Có lỗi xảy ra vui lòng đăng nhập lại', 'Lỗi', {
          progressBar: true,
        });
      }
    });

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        User: this.cookieService.get('user'),
      },
    });

    return next.handle(req);
  }
}
