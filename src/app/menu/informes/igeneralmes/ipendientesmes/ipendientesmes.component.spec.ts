import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { IpendientesmesComponent } from './ipendientesmes.component';

describe('IpendientesmesComponent', () => {
  let component: IpendientesmesComponent;
  let fixture: ComponentFixture<IpendientesmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpendientesmesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpendientesmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
