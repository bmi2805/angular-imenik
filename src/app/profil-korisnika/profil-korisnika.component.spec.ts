import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKorisnikaComponent } from './profil-korisnika.component';

describe('ProfilKorisnikaComponent', () => {
  let component: ProfilKorisnikaComponent;
  let fixture: ComponentFixture<ProfilKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilKorisnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
