import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOneComponent } from './menu-one.component';

describe('MenuOneComponent', () => {
  let component: MenuOneComponent;
  let fixture: ComponentFixture<MenuOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuOneComponent]
    });
    fixture = TestBed.createComponent(MenuOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
