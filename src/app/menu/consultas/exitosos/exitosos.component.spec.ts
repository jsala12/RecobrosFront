import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitososComponent } from './exitosos.component';

describe('ExitososComponent', () => {
  let component: ExitososComponent;
  let fixture: ComponentFixture<ExitososComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitososComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
