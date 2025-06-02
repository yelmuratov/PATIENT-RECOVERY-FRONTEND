import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdviceComponent } from './system-advice.component';

describe('SystemAdviceComponent', () => {
  let component: SystemAdviceComponent;
  let fixture: ComponentFixture<SystemAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
