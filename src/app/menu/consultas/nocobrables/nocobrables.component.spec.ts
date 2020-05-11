import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocobrablesComponent } from './nocobrables.component';

describe('NocobrablesComponent', () => {
  let component: NocobrablesComponent;
  let fixture: ComponentFixture<NocobrablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocobrablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocobrablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
