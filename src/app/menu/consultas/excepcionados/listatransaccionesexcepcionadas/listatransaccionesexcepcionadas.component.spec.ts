import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListatransaccionesexcepcionadasComponent } from './listatransaccionesexcepcionadas.component';

describe('ListatransaccionesexcepcionadasComponent', () => {
  let component: ListatransaccionesexcepcionadasComponent;
  let fixture: ComponentFixture<ListatransaccionesexcepcionadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListatransaccionesexcepcionadasComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatransaccionesexcepcionadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
