import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListaicargadostxComponent } from './listaicargadostx.component';

describe('ListaicargadostxComponent', () => {
  let component: ListaicargadostxComponent;
  let fixture: ComponentFixture<ListaicargadostxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaicargadostxComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaicargadostxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
