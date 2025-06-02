import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationReplyComponent } from './consultation-reply.component';

describe('ConsultationReplyComponent', () => {
  let component: ConsultationReplyComponent;
  let fixture: ComponentFixture<ConsultationReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
