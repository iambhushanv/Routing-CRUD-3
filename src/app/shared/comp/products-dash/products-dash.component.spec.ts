import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDashComponent } from './products-dash.component';

describe('ProductsDashComponent', () => {
  let component: ProductsDashComponent;
  let fixture: ComponentFixture<ProductsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
