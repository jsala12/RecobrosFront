import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeudasexcComponent } from './ideudasexc.component';

describe('IdeudasexcComponent', () => {
  let component: IdeudasexcComponent;
  let fixture: ComponentFixture<IdeudasexcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeudasexcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeudasexcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
