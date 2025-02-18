import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVenueCollectionComponent } from './all-venue-collection.component';

describe('AllVenueCollectionComponent', () => {
  let component: AllVenueCollectionComponent;
  let fixture: ComponentFixture<AllVenueCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllVenueCollectionComponent]
    });
    fixture = TestBed.createComponent(AllVenueCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
