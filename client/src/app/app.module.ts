import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { CookieService } from 'ngx-cookie-service';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { FolderListComponent } from './components/folder-list/folder-list.component';
import { MatCardModule } from '@angular/material/card';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteComponent } from './components/note/note.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GraphQLModule } from './graphql.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ModalAddFolderComponent } from './components/folder-list/modal-add-folder/modal-add-folder.component';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserMenuComponent,
    FolderListComponent,
    NoteListComponent,
    NoteComponent,
    ModalAddFolderComponent,
    PushNotificationComponent,
  ],
  imports: [
    FormsModule,
    MatBadgeModule,
    MatCardModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    GraphQLModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'timer' }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
