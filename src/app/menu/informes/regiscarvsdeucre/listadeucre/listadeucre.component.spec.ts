import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListadeucreComponent } from './listadeucre.component';

describe('ListadeucreComponent', () => {
  let component: ListadeucreComponent;
  let fixture: ComponentFixture<ListadeucreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadeucreComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadeucreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
