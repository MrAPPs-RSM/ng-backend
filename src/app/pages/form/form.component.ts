import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalState } from '../../global.state';
import { ActivatedRoute } from '@angular/router';

import { formConfig } from './form.config';
import { FormLoaderService } from './services/form-loader.service';
import { ApiService } from '../../api';

@Component({
  selector: '',
  styleUrls: ['./form.scss'],
  templateUrl: './form.html'
})

export class Form implements OnInit{

  params: any = {}; // Setup params
  id: number = null;

  formConfig: any = {};
  fields: any = {};
  form: FormGroup;
  payLoad = '';

  constructor(
      protected _route: ActivatedRoute,
      protected _state: GlobalState,
      protected _loaderService: FormLoaderService,
      protected _apiService: ApiService) {
  }

  ngOnInit() {
    this.formConfig = formConfig;
    this.params = this._route.snapshot.data;
    this.checkEditOrCreate();
    this.fields = this.params.form.fields;
    this.form = this._loaderService.createFormGroup(this.fields);

    this.ngOnChange();
  }

  ngOnChange() {
    this.form.valueChanges
        .subscribe(data => {
          this.payLoad = JSON.stringify(this.form.value);
        }
    );
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
    if (this.id !== null) {
      this._apiService.post(
          this.params.api.name,
          this.payLoad,
          true,
          '/' + this.id
      )
          .subscribe(
              data => {},
              error => {}
          );
    } else {
      this._apiService.put(
          this.params.api.name,
          this.payLoad,
          true
      )
          .subscribe(
              data => {},
              error => {}
          );
    }
  }

}
