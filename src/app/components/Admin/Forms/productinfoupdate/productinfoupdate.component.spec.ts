import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductinfoupdateComponent } from './productinfoupdate.component';

describe('ProductinfoupdateComponent', () => {
  let component: ProductinfoupdateComponent;
  let fixture: ComponentFixture<ProductinfoupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductinfoupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductinfoupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
