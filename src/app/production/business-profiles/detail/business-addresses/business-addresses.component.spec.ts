import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddressesComponent } from './business-addresses.component';

describe('BusinessAddressesComponent', () => {
  let component: BusinessAddressesComponent;
  let fixture: ComponentFixture<BusinessAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
