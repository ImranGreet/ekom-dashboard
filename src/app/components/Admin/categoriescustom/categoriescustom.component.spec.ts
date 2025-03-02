import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriescustomComponent } from './categoriescustom.component';

describe('CategoriescustomComponent', () => {
  let component: CategoriescustomComponent;
  let fixture: ComponentFixture<CategoriescustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriescustomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriescustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
