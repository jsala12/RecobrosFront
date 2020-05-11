import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcobrosComponent } from './icobros.component';

describe('IcobrosComponent', () => {
  let component: IcobrosComponent;
  let fixture: ComponentFixture<IcobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
