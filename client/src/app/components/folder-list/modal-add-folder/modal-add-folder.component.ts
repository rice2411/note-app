import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-add-folder',
  templateUrl: './modal-add-folder.component.html',
  styleUrls: ['./modal-add-folder.component.scss'],
})
export class ModalAddFolderComponent {
  @Input() folderName: string = '';
  constructor(public dialog: MatDialog) {}
}
