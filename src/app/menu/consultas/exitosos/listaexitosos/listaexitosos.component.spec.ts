import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListaexitososComponent } from './listaexitosos.component';

describe('ListaexitososComponent', () => {
  let component: ListaexitososComponent;
  let fixture: ComponentFixture<ListaexitososComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaexitososComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaexitososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
