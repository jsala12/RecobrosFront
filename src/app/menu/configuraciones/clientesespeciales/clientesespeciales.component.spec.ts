import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesespecialesComponent } from './clientesespeciales.component';

describe('ClientesespecialesComponent', () => {
  let component: ClientesespecialesComponent;
  let fixture: ComponentFixture<ClientesespecialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesespecialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesespecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
