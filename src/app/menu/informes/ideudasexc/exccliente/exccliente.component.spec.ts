import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ExcclienteComponent } from './exccliente.component';

describe('ExcclienteComponent', () => {
  let component: ExcclienteComponent;
  let fixture: ComponentFixture<ExcclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcclienteComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
