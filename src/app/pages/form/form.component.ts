import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { formConfig } from './form.config';
import { FormLoaderService, FormHelperService } from './services';
import { ApiService } from '../../api';
import { ToastHandler } from '../../theme/services';
import { TitleChecker } from '../services';

@Component({
    selector: '',
    styleUrls: ['./form.scss'],
    templateUrl: './form.html'
})

export class Form implements OnInit {

    public formConfig: any = {};
    public fields: any = {};
    public form: FormGroup;
    public payLoad: string = '';

    private params: any = {}; // Setup params
    private id: number = null;

    constructor(protected _route: ActivatedRoute,
                protected _titleChecker: TitleChecker,
                protected _loaderService: FormLoaderService,
                protected _apiService: ApiService,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this.formConfig = formConfig;
        this.params = this._route.snapshot.data;
        this._titleChecker.setCorrectTitle(this._route, this.params);
        this.checkEditOrCreate();
        this.fields = this.params.form.fields;
        this.form = this._loaderService.createFormGroup(this.fields);

        this.ngOnChange();
    }

    get isFormValid() {
        return FormHelperService.isValid(this.form, this.fields);
    }

    ngOnChange() {
        this.form.valueChanges
            .subscribe(data => {
                    console.log(this.form.value);
                    this.payLoad = JSON.stringify(this.form.value);
                }
            );
    }

    checkEditOrCreate(): void {
        let urlParams = this._route.snapshot.params;
        // Check if edit or create
        if (urlParams && urlParams['id']) {
            this.id = urlParams['id'];

            // TODO call API get/id here to populate form
        }
    }

    onSubmit() {
        if (this.id !== null) {
            this._apiService.post(
                this.params.api.endpoint + '/' + this.id,
                this.payLoad
            ).subscribe(
                data => {
                },
                error => {
                    this._toastManager.error(error);
                }
            );
        } else {
            this._apiService.put(
                this.params.api.endpoint,
                this.payLoad
            )
                .subscribe(
                    data => {
                    },
                    error => {
                        this._toastManager.error(error);
                    }
                );
        }
    }

}
