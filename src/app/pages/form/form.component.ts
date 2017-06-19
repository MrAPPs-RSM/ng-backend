import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { formConfig } from './form.config';
import { FormLoaderService, FormHelperService } from './services';
import { ApiService } from '../../api';
import { ToastHandler, ModalHandler } from '../../theme/services';
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
                protected _modalHandler: ModalHandler,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this.formConfig = formConfig;
        this.params = this._route.snapshot.data;
        this._titleChecker.setCorrectTitle(this._route, this.params);
        this.fields = this.params.form.fields;
        this.form = this._loaderService.createFormGroup(this.fields);
        this.checkEditOrCreate();

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
        if (urlParams && urlParams['id']) {
            this.id = urlParams['id'];

            let requestOptions = null;
            if (this.params.api.filter) {
                requestOptions = {
                    search: new URLSearchParams()
                };
                requestOptions.search.set('filter', this.params.api.filter);
            }
            this._apiService.get(this.params.api.endpoint + '/' + this.id, requestOptions)
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
        this._modalHandler.confirm('Confirm save')
            .then(() => {
                if (this.id) {
                    this._apiService.patch(
                        this.params.api.endpoint + '/' + this.id,
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
                } else {
                    this._apiService.put(
                        this.params.api.endpoint,
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
            })
            .catch(() => {
            });
    }

    onButtonClick(redirectTo: string): void {
        if (redirectTo.indexOf(':id') !== -1) {
            redirectTo = redirectTo.replace(':id', this.id);
        }
        this._router.navigate(['pages/' + redirectTo]);
    }
}
