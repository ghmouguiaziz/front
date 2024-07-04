import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshasesHistoryComponent } from './PurshasesHistory.component';

describe('PurshasesHistoryComponent', () => {
  let component: PurshasesHistoryComponent;
  let fixture: ComponentFixture<PurshasesHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurshasesHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurshasesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
