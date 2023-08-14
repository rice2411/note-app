import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAddFolderComponent } from './modal-add-folder/modal-add-folder.component';
import { MatDialog } from '@angular/material/dialog';
import { FolderService } from 'src/app/service/folder/folder.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {
  folders: any[] = [];
  folderId: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private folderService: FolderService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe((param) => {
      this.folderId = param['folderId'];
    });
    this.fetchData();
  }

  accessFolder(folderId: string) {
    this.router.navigate(['folder/' + folderId], { relativeTo: this.route });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddFolderComponent, {
      data: { folderName: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinnerService.show();
        this.folderService.createFolder(result).subscribe(() => {
          this.spinnerService.hide();
          this.fetchData();
          this.toastr.success(`Đã thêm mới thư mục ${result}`, 'Thành công', {
            progressBar: true,
          });
        });
      }
    });
  }

  fetchData() {
    this.spinnerService.show();
    this.folderService.getFolders().subscribe({
      next: (res: any) => {
        this.folders = res.data.folders;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.spinnerService.hide();
      },
    });
  }
}
