import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopDetailComponent } from './laptop-detail.component';

describe('LaptopDetailComponent', () => {
  let component: LaptopDetailComponent;
  let fixture: ComponentFixture<LaptopDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
