import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiscarvsdeucreComponent } from './regiscarvsdeucre.component';

describe('RegiscarvsdeucreComponent', () => {
  let component: RegiscarvsdeucreComponent;
  let fixture: ComponentFixture<RegiscarvsdeucreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiscarvsdeucreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiscarvsdeucreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
