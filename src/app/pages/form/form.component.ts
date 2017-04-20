import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalState } from '../../global.state';
import { ActivatedRoute } from '@angular/router';

import { formConfig } from './form.config';
import { FormLoaderService } from './services/form-loader.service';

@Component({
  selector: '',
  templateUrl: './form.html'
})

export class Form implements OnInit{

  params: any = {}; // Setup params
  id: number;

  formConfig: any = {};
  fields: any = {};
  form: FormGroup;
  payLoad = '';

  constructor(
      protected _route: ActivatedRoute,
      protected _state: GlobalState,
      protected _loaderService: FormLoaderService) {
  }

  ngOnInit() {
    this.formConfig = formConfig;
    this.params = this._route.snapshot.data;
    this.checkEditOrCreate();
    this.fields = this.params.form.fields;
    this.form = this._loaderService.createFormGroup(this.fields);
  }

  checkEditOrCreate(): void {
    let urlParams = this._route.snapshot.params;
    // Check if edit or create
    if (urlParams && urlParams['id']) {
      this.id = urlParams['id'];
      this._state.notifyDataChanged('menu.activeLink', {title: this.params.menu.title + ' ' + this.id});

      // TODO call API get/id here to populate form
    }
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }


}
