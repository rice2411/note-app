import { NoteService } from '../../service/note/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  private noteId: string = '';
  public searchControl: FormControl | any;
  content: string = '';
  note: any;
  htmlContent: any = ``;
  editorConfig: AngularEditorConfig = {
    minHeight: '25vh',
    width: '350px',
    minWidth: '350px',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.debounceEditContent();
  }
  debounceEditContent() {
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((searchTerm: any) => {
          //Make Api call here
          if (searchTerm === this.note.content) {
            this.content = this.note.content;
          } else {
            this.content = searchTerm;
            return this.noteService.updateNote(this.note._id, searchTerm);
          }
          return 'ok';
        })
      )
      .subscribe((result: any) => {
        if (result.data && this.content !== this.note.content) {
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        }
      });
  }
  fetchData() {
    this.route?.params.subscribe((param) => {
      this.noteId = param['noteId'];
      this.noteService.getNoteById(this.noteId).subscribe((res: any) => {
        this.htmlContent = res.data.getNoteById.content;
        this.note = res.data.getNoteById;
      });
    });
  }
}
