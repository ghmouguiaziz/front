import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPriceComponent } from './services-price.component';

describe('ServicesPriceComponent', () => {
  let component: ServicesPriceComponent;
  let fixture: ComponentFixture<ServicesPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
