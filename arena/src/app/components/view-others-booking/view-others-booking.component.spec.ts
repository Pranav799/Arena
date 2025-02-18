import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOthersBookingComponent } from './view-others-booking.component';

describe('ViewOthersBookingComponent', () => {
  let component: ViewOthersBookingComponent;
  let fixture: ComponentFixture<ViewOthersBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOthersBookingComponent]
    });
    fixture = TestBed.createComponent(ViewOthersBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
