import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { noop, Observable, Observer, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';


import { MssvStepper, MssvStepperSteps } from './mssv-stepper.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartialMovieResult, SearchMovieResult } from '../../../../@mssv/services/_models/the-movie-db.models';
import { BulletinBoardService } from '../../../../@mssv/services/bulletin-board.service';
import { TheMovieDbService } from '../../../../@mssv/services/the-movie-db.service';
import { TheOpenMovieDbService } from '../../../../@mssv/services/the-open-movie-db.service';
import { MssvUtilsService } from '../../../../@mssv/services/mssv-utils.service';
import * as moment from 'moment';
import { TypeaheadMatch, TypeaheadOrder } from 'ngx-bootstrap/typeahead';
import { MovieInfoDto, MovieInfoService } from '@proxy/content-library/movie-info';
import { LookupDto } from '@proxy/shared';
import { PagedResultDto } from '@abp/ng.core';


@Component({
  selector: 'app-mssv-stepper',
  templateUrl: './mssv-stepper.component.html',
  styleUrls: ['./mssv-stepper.component.scss']
})
export class MssvStepperComponent implements OnInit {

  stepper: MssvStepper;
  steps: MssvStepperSteps[];

  search?: string;
  suggestions$?: Observable<MovieInfoDto[]>;
  errorMessage?: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  posterUrl: string;
  imdbExists: boolean;

  selectedOption: any;

  sortConfig3: TypeaheadOrder = {
    direction: 'desc',
    field: 'releaseDate'
  };

  selected: any;
  // Private
  private readonly _unsubscribeAll: Subject<any>;

  constructor(private http: HttpClient,
              private _formBuilder: FormBuilder,
              private _bulletinBoardService: BulletinBoardService,
              private _theMovieDbService: TheMovieDbService,
              private _theOpenMovieDbService: TheOpenMovieDbService,
              private _mssvUtilsService: MssvUtilsService,
              public readonly service: MovieInfoService
  ) {
    // Set the defaults
    this.firstFormGroup = this._formBuilder.group({
      searchImdb: [null],
      imdbId: [''],
      theMovieDb: [null],
      theOpenMovieDb: [null]
    });
    this.secondFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      distributionCompany: ['', Validators.required]
    });
    this.posterUrl = this._theMovieDbService.getMoviePosterUrl('');


    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.stepper = {
      activeStep: 1,
      formGroup: null
    };

    this.steps = [
      {
        step: 1,
        title: 'Content Type',
        description: 'Choose a valid content type',
        isActive: true,
        formGroup: null
      },
      {
        step: 2,
        title: 'Content Details',
        description: 'Enter your content details',
        isActive: false,
        formGroup: null
      },
      {
        step: 3,
        title: 'Business Info',
        description: 'Setup your account details',
        isActive: false,
        formGroup: null
      },
      {
        step: 4,
        title: 'Billing Details',
        description: 'Setup your account details',
        isActive: false,
        formGroup: null
      },
      {
        step: 5,
        title: 'Completed',
        description: 'Finish',
        isActive: false,
        formGroup: null
      }
    ];

    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.search);
    })
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap((query: string) => {
          if (query) {
            // using the movie database API
            return this.service.getMovieInfo({ filter: query, maxResultCount: 10, skipCount: 0 })
              .pipe(
                // Sort by Release Date, the newest first.
                map((data: PagedResultDto<MovieInfoDto>) => data && data.items || []),
                tap(() => noop, err => {
                  // in case of http error
                  this.errorMessage = err && err.message || 'Something went wrong';
                })
              );
          }

          return of([]);
        })
      );

  }

  selectTab(tabId: number) {
    this.stepper.activeStep = tabId;
  }

  stepperNext() {
    return this.stepper.activeStep++;
  }

  stepperPrevious() {
    return this.stepper.activeStep--;
  }

  imdbMovieSelected(event: TypeaheadMatch): void {
    const partialMovie = event.item;

    this.service.get(partialMovie.id)
      .subscribe(movie => {

        this.posterUrl = this._theMovieDbService.getMoviePosterUrl(movie.posterPath);
        this.firstFormGroup.controls.imdbId.setValue(movie.imdbId);
        this.firstFormGroup.controls.theMovieDb.setValue(movie);
        this.secondFormGroup.controls.title.setValue(movie.title);

        /*        this._theOpenMovieDbService.searchForMovieByImdbId(movie.imdbId)
                  .subscribe(oMovie => {
                    this.secondFormGroup.controls.title.setValue(oMovie.title);
                    this.firstFormGroup.controls.theOpenMovieDb.setValue(oMovie);
                  });*/
      });
  }

}
