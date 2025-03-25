import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackSectionComponent } from './black-section.component';

describe('BlackSectionComponent', () => {
  let component: BlackSectionComponent;
  let fixture: ComponentFixture<BlackSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
