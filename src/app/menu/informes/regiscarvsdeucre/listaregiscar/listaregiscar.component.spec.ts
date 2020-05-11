import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListaregiscarComponent } from './listaregiscar.component';

describe('ListaregiscarComponent', () => {
  let component: ListaregiscarComponent;
  let fixture: ComponentFixture<ListaregiscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaregiscarComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaregiscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
