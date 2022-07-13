import { Component, Input, OnInit } from '@angular/core';
import {
  BusinessProfileDto
} from '@proxy/production/business-profiles';
import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import {
  BusinessAddressDto,
  BusinessAddressService,
  GetBusinessAddressesInput
} from '@proxy/production/business-addresses';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { addressTypeOptions } from '../../../../proxy/production/common/address-type.enum';


@Component({
  selector: 'app-business-addresses',
  templateUrl: './business-addresses.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  styleUrls: ['./business-addresses.component.scss']
})
export class BusinessAddressesComponent implements OnInit {

  @Input() businessProfile: BusinessProfileDto = null;

  data: PagedResultDto<BusinessAddressDto> = {
    items: [],
    totalCount: 0
  };

  filters = {} as GetBusinessAddressesInput;

  form: FormGroup;

  isModalBusy = false;

  isModalOpen = false;

  selected?: BusinessAddressDto;

  addressTypeOptions = addressTypeOptions;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: BusinessAddressService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>

      this.service.getList({
        ...query,
        ...this.filters,
        ...{ businessProfileId: this.businessProfile.id },
        filterText: query.filter
      });

    const setData = (list: PagedResultDto<BusinessAddressDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetBusinessAddressesInput;
  }

  buildForm() {
    const { city, country, line1, line2, line3, postalCode, stateProvince, type } =
    this.selected || {};

    this.form = this.fb.group({
      type: [type ?? null, [Validators.required]],
      businessProfileId: [this.businessProfile.id ?? null, [Validators.required]],
      line1: [line1 ?? null, [Validators.maxLength(100)]],
      line2: [line2 ?? null, [Validators.maxLength(100)]],
      line3: [line3 ?? null, [Validators.maxLength(100)]],
      city: [city ?? null, [Validators.maxLength(50)]],
      stateProvince: [stateProvince ?? null, [Validators.maxLength(50)]],
      country: [country ?? null, [Validators.maxLength(50)]],
      postalCode: [postalCode ?? null, [Validators.maxLength(50)]],
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
    debugger;
    this.buildForm();
    this.isModalOpen = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const request = this.selected
      ? this.service.update(this.selected.id, this.form.value)
      : this.service.create(this.form.value);

    this.isModalBusy = true;

    request
      .pipe(
        finalize(() => (this.isModalBusy = false)),
        tap(() => this.hideForm())
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: BusinessAddressDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: BusinessAddressDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe(this.list.get);
  }
}
