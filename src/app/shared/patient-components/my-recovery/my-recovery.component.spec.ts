import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecoveryComponent } from './my-recovery.component';

describe('MyRecoveryComponent', () => {
  let component: MyRecoveryComponent;
  let fixture: ComponentFixture<MyRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
