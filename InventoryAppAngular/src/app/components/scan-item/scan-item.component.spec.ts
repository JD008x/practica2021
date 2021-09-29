import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanItemComponent } from './scan-item.component';

describe('ScanItemComponent', () => {
  let component: ScanItemComponent;
  let fixture: ComponentFixture<ScanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
