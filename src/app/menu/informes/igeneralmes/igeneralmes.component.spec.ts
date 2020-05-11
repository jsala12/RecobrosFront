import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgeneralmesComponent } from './igeneralmes.component';

describe('IgeneralmesComponent', () => {
  let component: IgeneralmesComponent;
  let fixture: ComponentFixture<IgeneralmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgeneralmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgeneralmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
