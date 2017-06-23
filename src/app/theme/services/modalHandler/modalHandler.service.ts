import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class ModalHandler {

    constructor(protected overlay: Overlay,
                public modal: Modal) {
    }

    public setRootViewContainerRef(vcr: ViewContainerRef): void {
        this.overlay.defaultViewContainer = vcr;
    }

    public confirm(title?: string, body?: string, confirm?: string, dismiss?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.modal.confirm()
                .size('sm')
                .showClose(false)
                .title(title ? title : 'Confirm action')
                .body(body ? body : 'Are you sure?')
                .okBtn(confirm ? confirm : 'Confirm')
                .okBtnClass('btn btn-sm btn-primary')
                .cancelBtn(dismiss ? dismiss : 'Dismiss')
                .cancelBtnClass('btn btn-sm btn-warning')
                .headerClass('modal-header-custom')
                .bodyClass('modal-body-custom')
                .footerClass('modal-footer-custom')
                .open()
                .then((dialogRef) => dialogRef.result)
                .then(() => {
                    resolve(); // Confirm
                })
                .catch(() => {
                    reject(); // Dismiss
                });
        });
    }

    public alert(title: string, body: string): Promise<any> {
        return new Promise ((resolve, reject) => {
            this.modal.alert()
                .size('sm')
                .isBlocking(true)
                .showClose(true)
                .title(title)
                .body(body)
                .okBtn('Ok')
                .okBtnClass('btn btn-sm btn-primary')
                .headerClass('modal-header-custom')
                .bodyClass('modal-body-custom')
                .footerClass('modal-footer-custom')
                .open()
                .then((dialogRef) => dialogRef.result)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }
}
