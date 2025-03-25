import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAndPhotoComponent } from './name-and-photo.component';

describe('NameAndPhotoComponent', () => {
  let component: NameAndPhotoComponent;
  let fixture: ComponentFixture<NameAndPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameAndPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameAndPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
