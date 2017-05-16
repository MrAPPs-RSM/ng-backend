import { Component, ElementRef, EventEmitter, Input, Renderer, ViewChild } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile } from 'ngx-uploader';
import { FormGroup } from '@angular/forms';
import { ToastHandler } from '../../../../theme/services';
import { ApiService } from '../../../../api';
import { Utils } from '../../../../utils';

@Component({
    selector: 'file-uploader',
    styleUrls: ['./file.scss'],
    templateUrl: './file.html',
})
export class File {

    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('fileUpload') public _fileUpload: ElementRef;

    files: UploadFile[] = [];
    uploadedFiles: UploadedFile[] = [];
    uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
    dragOver: boolean;

    constructor(protected _renderer: Renderer,
                protected _apiService: ApiService,
                protected _toastManager: ToastHandler) {
    }

    /**
     * Just to invoke file selection if click on button or input text
     * @returns {boolean}
     */
    bringFileSelector(): boolean {
        this._renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    }

    onUploadOutput(output: UploadOutput): void {
        switch (output.type) {
            case 'addedToQueue': {
                this._fileUpload.nativeElement.value = ''; // Clear always file input value to avoid errors
                this.files.push(output.file);
                this.startUpload(output.file);
            }
                break;
            case 'dragOver': {
                this.dragOver = true;
            }
                break;
            case 'dragOut': {
                this.dragOver = false;
            }
                break;
            case 'drop': {
                this.dragOver = false;
            }
                break;
            default: {
            }
                break;
        }
    }

    startUpload(file: UploadFile): void {
        this._apiService.postFile(this.field.options.api.upload, file).subscribe(
            data => {
                this._toastManager.success(file.name + ' uploaded');
                this.addToUpdatedFiles(file);
            },
            error => {
                this._toastManager.error("Can't upload " + file.name);
            }
        );
    }

    cancelUpload(deletedFile: UploadFile): void {
        this.files = this.files.filter((file: UploadFile) => file !== deletedFile);
        this._apiService.post(this.field.options.api.delete, deletedFile, false).subscribe(
            data => {
                this._toastManager.success(deletedFile.name + ' removed');
                this.removeFromUpdatedFiles(deletedFile);
            },
            error => {
                this._toastManager.error("Can't remove " + deletedFile.name);
            }
        );
    }

    removeFromUpdatedFiles(deletedFile: UploadFile): void {
        this.uploadedFiles = Utils.removeObjectFromArray(
            {name: deletedFile.name, type: deletedFile.type}, this.uploadedFiles);
        this.updateFormValue();
    }

    addToUpdatedFiles(file: UploadFile): void {
        this.uploadedFiles.push({
            name: file.name,
            type: file.type
        });
        this.updateFormValue();
    }

    updateFormValue(): void {
        this.form.controls[this.field.key].setValue(this.uploadedFiles);
    }
}

export interface UploadedFile {
    name: string;
    type: string;
}
