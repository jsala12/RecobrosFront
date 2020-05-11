import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncobrablesComponent } from './incobrables.component';

describe('IncobrablesComponent', () => {
  let component: IncobrablesComponent;
  let fixture: ComponentFixture<IncobrablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncobrablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncobrablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
