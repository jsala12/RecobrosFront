import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasvscobrosComponent } from './deudasvscobros.component';

describe('DeudasvscobrosComponent', () => {
  let component: DeudasvscobrosComponent;
  let fixture: ComponentFixture<DeudasvscobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeudasvscobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudasvscobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
