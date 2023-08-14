import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/service/note/note.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  notes: any[] = [];
  folderId: string = '';
  noteId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route?.params.subscribe((param) => {
      this.folderId = param['folderId'];
      this.fetchData();
    });
    this.route.firstChild?.params.subscribe((param) => {
      this.noteId = param['noteId'];
    });
  }
  formatMoment(date: any) {
    return moment(date);
  }
  fetchData() {
    this.noteService.getNotesByFolderId(this.folderId).subscribe((res: any) => {
      this.notes = res.data.getNotesByFolderId;
      if (this.notes.length) {
        this.noteId = this.notes[0]._id;
        this.router.navigate(['note/' + this.notes[0]._id], {
          relativeTo: this.route,
        });
      }
    });
  }

  handleCreateNote() {
    this.spinnerService.show();
    this.noteService.createNote(this.folderId).subscribe({
      next: (v) => {
        this.toastr.success(`Đã thêm mới ghi chú`, 'Thành công', {
          progressBar: true,
        });
        this.fetchData();
      },
      error(err) {
        console.log(err);
      },
      complete: () => {
        this.spinnerService.hide();
      },
    });
  }
  openNote(noteId: string) {
    this.noteId = noteId;
    this.router.navigate(['note/' + noteId], { relativeTo: this.route });
  }
}
