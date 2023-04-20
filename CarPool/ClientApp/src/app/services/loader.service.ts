import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: boolean = false;
  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading() {
    return this.loading;
  }
}
