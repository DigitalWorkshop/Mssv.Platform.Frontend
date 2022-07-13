import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type {
  GetBusinessProfilesInput,
  BusinessProfileDto
} from '@proxy/production/business-profiles/models';
import { BusinessProfileService } from '@proxy/production/business-profiles/business-profile.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-business-profile',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './list.component.html',
  styles: []
})
export class BusinessProfileListComponent implements OnInit {
  data: PagedResultDto<BusinessProfileDto> = {
    items: [],
    totalCount: 0
  };

  filters = {} as GetBusinessProfilesInput;

  form: FormGroup;

  isModalBusy = false;

  isModalOpen = false;

  selected?: BusinessProfileDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: BusinessProfileService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter
      });

    const setData = (list: PagedResultDto<BusinessProfileDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetBusinessProfilesInput;
  }

  buildForm() {
    const { enterpriseName, acronym, registrationNumber, taxNumber } = this.selected || {};

    this.form = this.fb.group({
      enterpriseName: [enterpriseName ?? null, [Validators.required, Validators.maxLength(100)]],
      acronym: [acronym ?? null, [Validators.required, Validators.maxLength(5)]],
      registrationNumber: [registrationNumber ?? null, []],
      taxNumber: [taxNumber ?? null, []]
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
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
        tap(() => this.hideForm()),
        tap((data) => this.navigateToDetail(data))
      )
      .subscribe();
  }

  navigateToDetail(bProfile: BusinessProfileDto) {
    const bProfileId = bProfile ? bProfile.id : null;
    this._router.navigate(['./', bProfileId], { relativeTo: this.route });
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: BusinessProfileDto) {
    this.selected = record;
    // this.showForm();
    this.navigateToDetail(record);
  }

  delete(record: BusinessProfileDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe(this.list.get);
  }
}
