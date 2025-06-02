import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecoveryComponent } from './create-recovery.component';

describe('CreateRecoveryComponent', () => {
  let component: CreateRecoveryComponent;
  let fixture: ComponentFixture<CreateRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
