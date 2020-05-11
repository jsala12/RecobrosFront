import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeudasincComponent } from './ideudasinc.component';

describe('IdeudasincComponent', () => {
  let component: IdeudasincComponent;
  let fixture: ComponentFixture<IdeudasincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeudasincComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeudasincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
