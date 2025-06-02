import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRehabComponent } from './update-rehab.component';

describe('UpdateRehabComponent', () => {
  let component: UpdateRehabComponent;
  let fixture: ComponentFixture<UpdateRehabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRehabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRehabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
