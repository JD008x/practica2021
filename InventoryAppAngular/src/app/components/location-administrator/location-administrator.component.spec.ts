import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAdministratorComponent } from './location-administrator.component';

describe('LocationAdministratorComponent', () => {
  let component: LocationAdministratorComponent;
  let fixture: ComponentFixture<LocationAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
