import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRehabPlanComponent } from './edit-rehab-plan.component';

describe('EditRehabPlanComponent', () => {
  let component: EditRehabPlanComponent;
  let fixture: ComponentFixture<EditRehabPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRehabPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRehabPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
