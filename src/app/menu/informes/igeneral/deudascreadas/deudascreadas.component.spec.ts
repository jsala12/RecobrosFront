import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { DeudascreadasComponent } from './deudascreadas.component';

describe('DeudascreadasComponent', () => {
  let component: DeudascreadasComponent;
  let fixture: ComponentFixture<DeudascreadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeudascreadasComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudascreadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
