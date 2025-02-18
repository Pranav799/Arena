import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotbookingComponent } from './slotbooking.component';

describe('SlotbookingComponent', () => {
  let component: SlotbookingComponent;
  let fixture: ComponentFixture<SlotbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotbookingComponent]
    });
    fixture = TestBed.createComponent(SlotbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
