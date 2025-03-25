import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePhotoComponent } from './name-photo.component';

describe('NamePhotoComponent', () => {
  let component: NamePhotoComponent;
  let fixture: ComponentFixture<NamePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamePhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
