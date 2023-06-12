import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaboravljenPasswordComponent } from './zaboravljen-password.component';

describe('ZaboravljenPasswordComponent', () => {
  let component: ZaboravljenPasswordComponent;
  let fixture: ComponentFixture<ZaboravljenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaboravljenPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaboravljenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
