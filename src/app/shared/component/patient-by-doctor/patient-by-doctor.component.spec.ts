import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientByDoctorComponent } from './patient-by-doctor.component';

describe('PatientByDoctorComponent', () => {
  let component: PatientByDoctorComponent;
  let fixture: ComponentFixture<PatientByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientByDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
