import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverylogComponent } from './recoverylog.component';

describe('RecoverylogComponent', () => {
  let component: RecoverylogComponent;
  let fixture: ComponentFixture<RecoverylogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverylogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
