import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgeneralComponent } from './igeneral.component';

describe('IgeneralComponent', () => {
  let component: IgeneralComponent;
  let fixture: ComponentFixture<IgeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
