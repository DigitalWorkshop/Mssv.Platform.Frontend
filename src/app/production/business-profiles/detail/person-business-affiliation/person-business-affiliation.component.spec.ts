import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBusinessAffiliationComponent } from './person-business-affiliation.component';

describe('PersonBusinessAffiliationComponent', () => {
  let component: PersonBusinessAffiliationComponent;
  let fixture: ComponentFixture<PersonBusinessAffiliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonBusinessAffiliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBusinessAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
