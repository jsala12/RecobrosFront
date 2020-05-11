import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcepcionadosComponent } from './excepcionados.component';

describe('ExcepcionadosComponent', () => {
  let component: ExcepcionadosComponent;
  let fixture: ComponentFixture<ExcepcionadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcepcionadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcepcionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
