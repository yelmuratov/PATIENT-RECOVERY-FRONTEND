import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryDetailComponent } from './recovery-detail.component';

describe('RecoveryDetailComponent', () => {
  let component: RecoveryDetailComponent;
  let fixture: ComponentFixture<RecoveryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
