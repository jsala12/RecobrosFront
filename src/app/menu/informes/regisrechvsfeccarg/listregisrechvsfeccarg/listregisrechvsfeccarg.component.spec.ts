import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { ListregisrechvsfeccargComponent } from './listregisrechvsfeccarg.component';

describe('ListregisrechvsfeccargComponent', () => {
  let component: ListregisrechvsfeccargComponent;
  let fixture: ComponentFixture<ListregisrechvsfeccargComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListregisrechvsfeccargComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListregisrechvsfeccargComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
