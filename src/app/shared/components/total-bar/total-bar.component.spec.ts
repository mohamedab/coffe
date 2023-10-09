import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBarComponent } from './total-bar.component';

describe('TotalBarComponent', () => {
  let component: TotalBarComponent;
  let fixture: ComponentFixture<TotalBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalBarComponent]
    });
    fixture = TestBed.createComponent(TotalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
