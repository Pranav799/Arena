import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageAnimationComponent } from './landingpage-animation.component';

describe('LandingpageAnimationComponent', () => {
  let component: LandingpageAnimationComponent;
  let fixture: ComponentFixture<LandingpageAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingpageAnimationComponent]
    });
    fixture = TestBed.createComponent(LandingpageAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
