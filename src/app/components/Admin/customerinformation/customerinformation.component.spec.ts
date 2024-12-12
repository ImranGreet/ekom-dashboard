import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinformationComponent } from './customerinformation.component';

describe('CustomerinformationComponent', () => {
  let component: CustomerinformationComponent;
  let fixture: ComponentFixture<CustomerinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
