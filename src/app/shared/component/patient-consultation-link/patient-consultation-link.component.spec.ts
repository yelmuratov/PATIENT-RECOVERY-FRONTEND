import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConsultationLinkComponent } from './patient-consultation-link.component';

describe('PatientConsultationLinkComponent', () => {
  let component: PatientConsultationLinkComponent;
  let fixture: ComponentFixture<PatientConsultationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientConsultationLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConsultationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
