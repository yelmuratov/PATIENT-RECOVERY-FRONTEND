import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRehabComponent } from './create-rehab.component';

describe('CreateRehabComponent', () => {
  let component: CreateRehabComponent;
  let fixture: ComponentFixture<CreateRehabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRehabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRehabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
