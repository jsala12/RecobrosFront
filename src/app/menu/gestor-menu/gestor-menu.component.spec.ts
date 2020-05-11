import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorMenuComponent } from './gestor-menu.component';

describe('GestorMenuComponent', () => {
  let component: GestorMenuComponent;
  let fixture: ComponentFixture<GestorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
