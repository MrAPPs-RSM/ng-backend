import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { formConfig } from './form.config';
import { FormLoaderService, FormHelperService } from './services';
import { ApiService } from '../../api';
import { ToastHandler, ModalHandler } from '../../theme/services';
import { TitleChecker, PageRefresh } from '../services';
import { BaThemeSpinner } from '../../theme/services';

@Component({
    selector: '',
    styleUrls: ['./form.scss'],
    templateUrl: './form.html'
})

export class Form implements OnInit, OnDestroy {

    public formConfig: any = {};
    public fields: any = {};
    public form: FormGroup;
    public payLoad: string = '';
    public dataLoaded: boolean = false;

    private params: any = {}; // Setup params
    private id: number = null;

    constructor(protected _route: ActivatedRoute,
                protected _router: Router,
                protected _spinner: BaThemeSpinner,
                protected _pageRefreshService: PageRefresh,
                protected _titleChecker: TitleChecker,
                protected _loaderService: FormLoaderService,
                protected _apiService: ApiService,
                protected _modalHandler: ModalHandler,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this._spinner.hide();
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

    ngOnDestroy() {
        this._pageRefreshService.setLastPath(this._router.url);
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
                        this.dataLoaded = true;
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
        if (this.id) {
            this._modalHandler.confirm(
                this.params.form.messages && this.params.form.messages.modalTitle ? this.params.form.messages.modalTitle : 'Confirm edit',
                this.params.form.messages && this.params.form.messages.modalBody ? this.params.form.messages.modalBody : null,
                this.params.form.messages && this.params.form.messages.modalConfirm ? this.params.form.messages.modalConfirm : null,
                this.params.form.messages && this.params.form.messages.modalBody ? this.params.form.messages.modalDismiss : null
        )
                .then(() => {
                    this._apiService.patch(
                        this.params.api.endpoint + '/' + this.id,
                        this.payLoad
                    )
                        .subscribe(
                            data => {
                                this._toastManager.success(
                                    this.params.form.messages && this.params.form.messages.success ?
                                        this.params.form.messages.success : null);
                                if (this.params.form.options.submit.redirectAfter) {
                                    this._router.navigate(
                                        ['pages/' + this.params.form.options.submit.redirectAfter]);
                                }
                            },
                            error => {
                                this._toastManager.error(
                                    this.params.form.messages && this.params.form.messages.fail ?
                                        this.params.form.messages.fail : error
                                );
                            }
                        );
                })
                .catch(() => {
                });
        } else {
            this._modalHandler.confirm(
                this.params.form.messages && this.params.form.messages.modalTitle ? this.params.form.messages.modalTitle : 'Confirm save',
                this.params.form.messages && this.params.form.messages.modalBody ? this.params.form.messages.modalBody : null,
                this.params.form.messages && this.params.form.messages.modalConfirm ? this.params.form.messages.modalConfirm : null,
                this.params.form.messages && this.params.form.messages.modalBody ? this.params.form.messages.modalDismiss : null
            )
                .then(() => {
                    this._apiService.put(
                        this.params.api.endpoint,
                        this.payLoad
                    )
                        .subscribe(
                            data => {
                                this._toastManager.success(this.params.form.messages && this.params.form.messages.success ? this.params.form.messages.success : null);
                                if (this.params.form.options.submit.redirectAfter) {
                                    this._router.navigate(
                                        ['pages/' + this.params.form.options.submit.redirectAfter]);
                                }
                            },
                            error => {
                                this._toastManager.error(this.params.form.messages && this.params.form.messages.fail ? this.params.form.messages.fail : error);
                            }
                        );
                })
                .catch(() => {
                });
        }
    }

    onButtonClick(button: any): void {
        if (typeof button.redirectTo !== 'undefined') {
            let redirectTo = button.redirectTo;
            if (redirectTo.indexOf(':id') !== -1) {
                redirectTo = redirectTo.replace(':id', this.id.toString());
            }
            if (redirectTo.indexOf(':title') !== -1 && button.titleField) {
                redirectTo = redirectTo.replace(':title', this.form.controls[button.titleField].value);
            }
            this._router.navigate(['pages/' + redirectTo]);
        } else {
            if (typeof button.apiEndpoint !== 'undefined') {
                let endpoint = button.apiEndpoint.replace(':id', this.id.toString());
                this.dataLoaded = false;
                this._apiService.get(endpoint)
                    .subscribe(
                        data => {
                            this.dataLoaded = true;
                            this._toastManager.success(data.message ? data.message : null);
                        },
                        error => {
                            this.dataLoaded = true;
                            this._toastManager.error(error);
                        }
                    );
            }
        }
    }
}
