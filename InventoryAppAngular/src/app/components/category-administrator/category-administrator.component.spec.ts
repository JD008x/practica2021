import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdministratorComponent } from './category-administrator.component';

describe('CategoryAdministratorComponent', () => {
  let component: CategoryAdministratorComponent;
  let fixture: ComponentFixture<CategoryAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
