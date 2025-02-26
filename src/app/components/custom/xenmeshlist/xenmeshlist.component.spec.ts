import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XenmeshlistComponent } from './xenmeshlist.component';

describe('XenmeshlistComponent', () => {
  let component: XenmeshlistComponent;
  let fixture: ComponentFixture<XenmeshlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XenmeshlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XenmeshlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
