import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListaideudasincComponent } from './listaideudasinc.component';

describe('ListaideudasincComponent', () => {
  let component: ListaideudasincComponent;
  let fixture: ComponentFixture<ListaideudasincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaideudasincComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaideudasincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
