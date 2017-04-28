import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SideBarVisibilityService {
  private state = new BehaviorSubject<string>("show") ;
  state$ = this.state.asObservable();

  constructor() { }

  setState(newState: string) {
    this.state.next(newState);
  }

}
