import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageBannerComponent } from './app-page-banner.component';

describe('AppPageBannerComponent', () => {
  let component: AppPageBannerComponent;
  let fixture: ComponentFixture<AppPageBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPageBannerComponent]
    });
    fixture = TestBed.createComponent(AppPageBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
