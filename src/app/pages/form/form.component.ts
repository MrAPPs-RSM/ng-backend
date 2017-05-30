import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
                protected _router: Router,
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
                    this.payLoad = JSON.stringify(this.form.value);
                }
            );
    }

    checkEditOrCreate(): void {
        let urlParams = this._route.snapshot.params;
        // Check if edit or create
        if (urlParams && urlParams['id']) {
            this.id = urlParams['id'];

            this._apiService.get(this.params.api.endpoint + '/' + this.id)
                .subscribe(
                    data => {
                        Object.keys(data).forEach((key) => {
                            if (this.form.controls[key]) {
                                this.form.controls[key].setValue(data[key]);
                            }
                        });
                    },
                    error => {
                        this._toastManager.error(error);
                        if (this.params.form.options.submit.redirectAfter) {
                            this._router.navigate(
                                ['pages/' + this.params.form.options.submit.redirectAfter]);
                        }
                    }
                );
        }
    }

    onSubmit() {
        this._apiService.put(
            this.id ? this.params.api.endpoint + '/' + this.id : this.params.api.endpoint,
            this.payLoad
        )
            .subscribe(
                data => {
                    this._toastManager.success();
                    if (this.params.form.options.submit.redirectAfter) {
                        this._router.navigate(
                            ['pages/' + this.params.form.options.submit.redirectAfter]);
                    }
                },
                error => {
                    this._toastManager.error(error);
                }
            );
    }

}
