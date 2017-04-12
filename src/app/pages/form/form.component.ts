import { Component } from '@angular/core';
import { GlobalState } from '../../global.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form',
  templateUrl: './form.html'
})
export class Form {

  params: any = {}; // Setup params
  id: number;

  constructor(protected _route: ActivatedRoute, protected _state: GlobalState) {

    this.params = this._route.snapshot.data;
    let urlParams = this._route.snapshot.params;

    // Check if edit or create
    if (urlParams && urlParams['id']) {
      this.id = urlParams['id'];
      this.updatePageTitle(this.params.menu.title + ' ' + this.id);
    }

  }

  updatePageTitle(title: string): void {
    this._state.notifyDataChanged('menu.activeLink', {title: title});
  }
}
