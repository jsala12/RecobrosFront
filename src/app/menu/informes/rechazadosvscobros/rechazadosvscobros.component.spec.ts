import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazadosvscobrosComponent } from './rechazadosvscobros.component';

describe('RechazadosvscobrosComponent', () => {
  let component: RechazadosvscobrosComponent;
  let fixture: ComponentFixture<RechazadosvscobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazadosvscobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazadosvscobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
