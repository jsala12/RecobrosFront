import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcargadostxComponent } from './icargadostx.component';

describe('IcargadostxComponent', () => {
  let component: IcargadostxComponent;
  let fixture: ComponentFixture<IcargadostxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcargadostxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcargadostxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
