import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import 'style-loader!./login.scss';
import { BaThemeSpinner } from '../theme/services';

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login implements OnInit {

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    constructor(private _formBuilder: FormBuilder, private _spinner: BaThemeSpinner) {
    }

    ngOnInit() {
        this._spinner.hide();
        this.form = this._formBuilder.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            // your code goes here
            // console.log(values);
        }
    }
}
