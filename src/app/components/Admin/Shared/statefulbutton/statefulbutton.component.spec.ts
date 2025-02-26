import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatefulbuttonComponent } from './statefulbutton.component';

describe('StatefulbuttonComponent', () => {
  let component: StatefulbuttonComponent;
  let fixture: ComponentFixture<StatefulbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatefulbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatefulbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
