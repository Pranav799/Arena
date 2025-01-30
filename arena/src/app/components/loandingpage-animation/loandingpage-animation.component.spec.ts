import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandingpageAnimationComponent } from './loandingpage-animation.component';

describe('LoandingpageAnimationComponent', () => {
  let component: LoandingpageAnimationComponent;
  let fixture: ComponentFixture<LoandingpageAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoandingpageAnimationComponent]
    });
    fixture = TestBed.createComponent(LoandingpageAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
