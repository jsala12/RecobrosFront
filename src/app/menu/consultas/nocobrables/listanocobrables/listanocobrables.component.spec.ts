import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListanocobrablesComponent } from './listanocobrables.component';

describe('ListanocobrablesComponent', () => {
  let component: ListanocobrablesComponent;
  let fixture: ComponentFixture<ListanocobrablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListanocobrablesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListanocobrablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
