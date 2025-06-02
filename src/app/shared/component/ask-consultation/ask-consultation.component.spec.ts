import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskConsultationComponent } from './ask-consultation.component';

describe('AskConsultationComponent', () => {
  let component: AskConsultationComponent;
  let fixture: ComponentFixture<AskConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
