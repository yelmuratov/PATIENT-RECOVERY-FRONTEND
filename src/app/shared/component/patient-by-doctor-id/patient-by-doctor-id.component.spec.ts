import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientByDoctorIdComponent } from './patient-by-doctor-id.component';

describe('PatientByDoctorIdComponent', () => {
  let component: PatientByDoctorIdComponent;
  let fixture: ComponentFixture<PatientByDoctorIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientByDoctorIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientByDoctorIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
