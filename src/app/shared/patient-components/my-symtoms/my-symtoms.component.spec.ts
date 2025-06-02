import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySymtomsComponent } from './my-symtoms.component';

describe('MySymtomsComponent', () => {
  let component: MySymtomsComponent;
  let fixture: ComponentFixture<MySymtomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySymtomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySymtomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
