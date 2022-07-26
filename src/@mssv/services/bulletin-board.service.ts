import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulletinBoardService {

    public onRepoChanged: BehaviorSubject<any>;
    public onLookUpsChanged: BehaviorSubject<any>;


    constructor() { }



}
