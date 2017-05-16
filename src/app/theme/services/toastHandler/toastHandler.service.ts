import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class ToastHandler {

    private defaultOptions: any = {
        showCloseButton: true,
        animate: 'flyRight',
        toastLife: 3500,
        titleClass: 'toastr-title',
        messageClass: 'toastr-message'
    };

    constructor(protected _toastManager: ToastsManager) {
    }

    public success(message?: string, title?: string, options?: any): void {
        this._toastManager.success(
            message ? message : 'Operation completed',
            title ? title : 'Success',
            options ? options : this.defaultOptions);
    }

    public error(message?: string, title?: string, options?: any): void {
        this._toastManager.error(
            message ? message : 'Operation failed',
            title ? title : 'Error',
            options ? options : this.defaultOptions);
    }

    public info(message?: string, title?: string, options?: any): void {
        this._toastManager.info(
            message ? message : 'Info message',
            title ? title : 'Info',
            options ? options : this.defaultOptions);
    }

    public warning(message?: string, title?: string, options?: any): void {
        this._toastManager.warning(
            message ? message : 'Warning message',
            title ? title : 'Warning',
            options ? options : this.defaultOptions);
    }
}
