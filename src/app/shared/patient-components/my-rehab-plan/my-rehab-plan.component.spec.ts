import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRehabPlanComponent } from './my-rehab-plan.component';

describe('MyRehabPlanComponent', () => {
  let component: MyRehabPlanComponent;
  let fixture: ComponentFixture<MyRehabPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRehabPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRehabPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
