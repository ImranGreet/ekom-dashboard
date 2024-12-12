import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseditemsComponent } from './purchaseditems.component';

describe('PurchaseditemsComponent', () => {
  let component: PurchaseditemsComponent;
  let fixture: ComponentFixture<PurchaseditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseditemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
