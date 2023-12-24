import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StubPageComponent } from './stub-page.component';

describe('StubPageComponent', () => {
  let component: StubPageComponent;
  let fixture: ComponentFixture<StubPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StubPageComponent]
    });
    fixture = TestBed.createComponent(StubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
