import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhandlerComponent } from './formhandler.component';

describe('FormhandlerComponent', () => {
  let component: FormhandlerComponent;
  let fixture: ComponentFixture<FormhandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormhandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
