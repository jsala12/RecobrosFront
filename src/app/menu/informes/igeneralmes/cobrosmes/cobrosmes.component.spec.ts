import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { CobrosmesComponent } from './cobrosmes.component';

describe('CobrosmesComponent', () => {
  let component: CobrosmesComponent;
  let fixture: ComponentFixture<CobrosmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobrosmesComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrosmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
