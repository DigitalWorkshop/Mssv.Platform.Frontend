import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type {
  GetBusinessProfilesInput,
  BusinessProfileDto
} from '@proxy/production/business-profiles/models';
import { BusinessProfileService } from '@proxy/production/business-profiles/business-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-business-profile',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './detail.component.html',
  styles: []
})
export class BusinessProfileDetailComponent implements OnInit {

  formTab1: FormGroup;

  bProfile$?: Observable<BusinessProfileDto>;
  businessProfile?: BusinessProfileDto;

  // Telephone Inputs
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.SouthAfrica, CountryISO.UnitedKingdom];

  constructor(
    public readonly track: TrackByService,
    public readonly service: BusinessProfileService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private _router: Router,
    injector: Injector
  ) {
    injector.get(ActivatedRoute).url.subscribe((url) => {
      this.bProfile$ = service.get(url.pop().toString());
    });
    this.buildForm();
  }

  ngOnInit() {
    this.bProfile$.subscribe((bP) => {
      this.businessProfile = bP;
      this.buildForm();
    });
  }

  buildForm() {
    const {
      enterpriseName,
      acronym,
      primaryPhone,
      secondaryPhone,
      fax,
      website,
      registrationNumber,
      taxNumber,
      companyLogo,
      description,
      notes
    } = this.businessProfile || {};

    this.formTab1 = this.fb.group({
      enterpriseName: [enterpriseName ?? null, [Validators.required]],
      primaryPhone: [primaryPhone ?? null, []],
      secondaryPhone: [secondaryPhone ?? null, []],
      fax: [fax ?? null, []],
      website: [website ?? null, []],
      description: [description ?? null, []],
      notes: [notes ?? null, []],
      tags: [[] ?? null, []],
      acronym: [acronym ?? null, [Validators.required]],
      registrationNumber: [registrationNumber ?? null, []],
      taxNumber: [taxNumber ?? null, []],
      companyLogo: [companyLogo ?? null, []]
    });
  }

  submitForm() {
    if (this.formTab1.invalid) return;

    const primaryPhone = this.formTab1.value['primaryPhone']?.internationalNumber ?? null;
    const secondaryPhone = this.formTab1.value['secondaryPhone']?.internationalNumber ?? null;
    const fax = this.formTab1.value['fax']?.internationalNumber ?? null;


    const formResult = {
      ...this.formTab1.value,
      ...{
        primaryPhone,
        secondaryPhone,
        fax
      }
    };

    const request = this.businessProfile
      ? this.service.update(this.businessProfile.id, formResult)
      : this.service.create(formResult);

    request
      .subscribe();
  }

  back(): void {
    this._router.navigate(['/production/business-profiles']);
  }

  delete(record: BusinessProfileDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe();
  }
}
