import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryByPatientComponent } from './recovery-by-patient.component';

describe('RecoveryByPatientComponent', () => {
  let component: RecoveryByPatientComponent;
  let fixture: ComponentFixture<RecoveryByPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryByPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryByPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
