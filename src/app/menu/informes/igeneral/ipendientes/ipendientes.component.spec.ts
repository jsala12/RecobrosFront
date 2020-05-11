import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { IpendientesComponent } from './ipendientes.component';

describe('IpendientesComponent', () => {
  let component: IpendientesComponent;
  let fixture: ComponentFixture<IpendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpendientesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
