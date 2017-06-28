import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import 'style-loader!./login.scss';
import { BaThemeSpinner } from '../theme/services';
import { config } from '../app.config';
import { FormLoaderService } from '../pages/form/services';
import { Router } from '@angular/router';
import { ToastHandler } from '../theme/services';
import { ApiService } from '../api';
import { TokenManager } from '../auth';

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login implements OnInit {

    public title: string;
    public icon: string;
    public config: any;
    public fields: any[];
    public form: FormGroup;
    public isPwdShown: boolean = false;
    private payload: string = '';
    @ViewChild('passwordInput') passwordInput;

    constructor(protected _loaderService: FormLoaderService,
                protected _spinner: BaThemeSpinner,
                protected _apiService: ApiService,
                protected _tokenManager: TokenManager,
                protected _router: Router,
                protected _toastManager: ToastHandler) {
        this.title = config.title;
        this.icon = config['icon'] ? config['icon'] : null;
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
            this._apiService.post(config.auth.config.api, this.payload)
                .subscribe(
                    response => {
                        this._tokenManager.storeToken(response.id);
                        this._spinner.show();
                        this._router.navigate(['pages/dashboard']);
                    },
                    error => {
                        this._toastManager.error(error);
                    }
                );
        }
    }

    public changePwdType(): void {
        this.isPwdShown = !this.isPwdShown;
        this.passwordInput.nativeElement.type = this.isPwdShown ? 'text' : 'password';
    }
}
