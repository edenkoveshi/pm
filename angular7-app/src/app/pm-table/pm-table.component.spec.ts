import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTableComponent } from './pm-table.component';

describe('PmTableComponent', () => {
  let component: PmTableComponent;
  let fixture: ComponentFixture<PmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
