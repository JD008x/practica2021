import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditCategoryComponent } from './inline-edit-category.component';

describe('InlineEditCategoryComponent', () => {
  let component: InlineEditCategoryComponent;
  let fixture: ComponentFixture<InlineEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineEditCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
