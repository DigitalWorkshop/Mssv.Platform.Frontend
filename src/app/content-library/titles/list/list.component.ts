import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { contentTypeOptions } from '../../../proxy/content-library/common/content-type.enum';
import type { GetTitlesInput, TitleDto } from '../../../proxy/content-library/titles/models';
import { TitleService } from '../../../proxy/content-library/titles/title.service';

@Component({
  selector: 'app-title',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './list.component.html',
  styles: [],
})
export class TitleListComponent implements OnInit {
  data: PagedResultDto<TitleDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetTitlesInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: TitleDto;

  contentTypeOptions = contentTypeOptions;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: TitleService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<TitleDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetTitlesInput;
  }

  buildForm() {
    const {
      name,
      titleType,
      imdbId,
      theMovieDbId,
      keywords,
      releaseDate,
      posterUrl,
      genre,
      description,
      rating,
      plot,
      runtime,
      alternativeTitleNames,
      countryOfOrigin,
      originalLanguage,
      directors,
      writers,
      actors,
      productionCompany,
      distributor,
    } = this.selected || {};

    this.form = this.fb.group({
      name: [name ?? null, [Validators.required]],
      titleType: [titleType ?? null, []],
      imdbId: [imdbId ?? null, []],
      theMovieDbId: [theMovieDbId ?? null, []],
      keywords: [keywords ?? null, []],
      releaseDate: [releaseDate ? new Date(releaseDate) : null, []],
      posterUrl: [posterUrl ?? null, []],
      genre: [genre ?? null, []],
      description: [description ?? null, []],
      rating: [rating ?? null, []],
      plot: [plot ?? null, []],
      runtime: [runtime ?? null, []],
      alternativeTitleNames: [alternativeTitleNames ?? null, []],
      countryOfOrigin: [countryOfOrigin ?? null, []],
      originalLanguage: [originalLanguage ?? null, []],
      directors: [directors ?? null, []],
      writers: [writers ?? null, []],
      actors: [actors ?? null, []],
      productionCompany: [productionCompany ?? null, []],
      distributor: [distributor ?? null, []],
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
        tap(() => this.hideForm())
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: TitleDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: TitleDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe(this.list.get);
  }
}
