import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairsDashComponent } from './fairs-dash.component';

describe('FairsDashComponent', () => {
  let component: FairsDashComponent;
  let fixture: ComponentFixture<FairsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
