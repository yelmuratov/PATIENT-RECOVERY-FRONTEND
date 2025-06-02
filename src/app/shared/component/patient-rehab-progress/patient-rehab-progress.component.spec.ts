import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRehabProgressComponent } from './patient-rehab-progress.component';

describe('PatientRehabProgressComponent', () => {
  let component: PatientRehabProgressComponent;
  let fixture: ComponentFixture<PatientRehabProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRehabProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRehabProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
