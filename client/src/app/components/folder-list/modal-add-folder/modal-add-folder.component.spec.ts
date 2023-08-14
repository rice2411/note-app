import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddFolderComponent } from './modal-add-folder.component';

describe('ModalAddFolderComponent', () => {
  let component: ModalAddFolderComponent;
  let fixture: ComponentFixture<ModalAddFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddFolderComponent]
    });
    fixture = TestBed.createComponent(ModalAddFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
