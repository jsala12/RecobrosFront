import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IexcepcionadosComponent } from './iexcepcionados.component';

describe('IexcepcionadosComponent', () => {
  let component: IexcepcionadosComponent;
  let fixture: ComponentFixture<IexcepcionadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IexcepcionadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IexcepcionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
