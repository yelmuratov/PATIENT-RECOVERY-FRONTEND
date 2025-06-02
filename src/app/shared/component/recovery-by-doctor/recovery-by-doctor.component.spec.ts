import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryByDoctorComponent } from './recovery-by-doctor.component';

describe('RecoveryByDoctorComponent', () => {
  let component: RecoveryByDoctorComponent;
  let fixture: ComponentFixture<RecoveryByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryByDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
