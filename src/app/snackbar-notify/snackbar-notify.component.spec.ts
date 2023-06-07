import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarNotifyComponent } from './snackbar-notify.component';

describe('SnackbarNotifyComponent', () => {
  let component: SnackbarNotifyComponent;
  let fixture: ComponentFixture<SnackbarNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarNotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
