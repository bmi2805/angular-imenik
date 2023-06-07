import { TestBed } from '@angular/core/testing';

import { SnackbarNotifyService } from './snackbar-notify/snackbar-notify.service';

describe('SnackbarNotifyService', () => {
  let service: SnackbarNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
