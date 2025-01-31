import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAnimationComponent } from './menu-animation.component';

describe('MenuAnimationComponent', () => {
  let component: MenuAnimationComponent;
  let fixture: ComponentFixture<MenuAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAnimationComponent]
    });
    fixture = TestBed.createComponent(MenuAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
