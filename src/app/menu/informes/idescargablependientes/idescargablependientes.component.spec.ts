import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdescargablependientesComponent } from './idescargablependientes.component';

describe('IdescargablependientesComponent', () => {
  let component: IdescargablependientesComponent;
  let fixture: ComponentFixture<IdescargablependientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdescargablependientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdescargablependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
