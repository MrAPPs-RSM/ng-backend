import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import 'style-loader!./login.scss';
import { BaThemeSpinner } from '../theme/services';
import { config } from '../app.config';
import { FormLoaderService } from '../pages/form/services';
import { ApiService } from '../api';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login implements OnInit {

    public config: any;
    public fields: any[];
    public form: FormGroup;
    private apiName: string = 'login';
    private payload: string = '';

    constructor(vcr: ViewContainerRef,
                private _loaderService: FormLoaderService,
                private _spinner: BaThemeSpinner,
                private _apiService: ApiService,
                private _router: Router,
                private _toastManager: ToastsManager) {
        this._toastManager.setRootViewContainerRef(vcr);
    }

    public isValidField(key: any) {
        return this.form.controls[key].valid;
    }

    public isTouchedField(key: any) {
        return this.form.controls[key].touched;
    }

    ngOnInit() {
        this._spinner.hide();
        this.config = config.auth.config;
        this.fields = config.auth.fields;
        this.form = this._loaderService.createFormGroup(this.fields);
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.payload = JSON.stringify(this.form.value);

            // FAKE LOCAL LOGIN
            setTimeout(() => {
                if (this.form.value[this.fields[0].key] === 'admin'
                && this.form.value[this.fields[1].key] === 'admin') {
                    this._spinner.show();
                    this._router.navigate(['pages']);
                } else {
                    this._toastManager.error(this.config.errorMessage);
                }
            }, 200);

            /* this._apiService.post(
                this.apiName,
                this.payload,
                true
            ).subscribe(
                data => { console.log(data); },
                error => { console.log(error); }
            ); */
        }
    }
}
