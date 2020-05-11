import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrrecudiarioComponent } from './irrecudiario.component';

describe('IrrecudiarioComponent', () => {
  let component: IrrecudiarioComponent;
  let fixture: ComponentFixture<IrrecudiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrrecudiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrrecudiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
