import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteComponent } from './components/note/note.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent,

        children: [
          {
            path: 'folder/:folderId',
            component: NoteListComponent,
            children: [{ path: 'note/:noteId', component: NoteComponent }],
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
