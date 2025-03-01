import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcustomizationComponent } from './productcustomization.component';

describe('ProductcustomizationComponent', () => {
  let component: ProductcustomizationComponent;
  let fixture: ComponentFixture<ProductcustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductcustomizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
