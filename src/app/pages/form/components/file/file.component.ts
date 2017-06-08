import { Component, ElementRef, EventEmitter, Input, OnInit, Renderer, ViewChild } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile } from 'ngx-uploader';
import { ToastHandler } from '../../../../theme/services';

import { FormGroup } from '@angular/forms';
import { Utils } from '../../../../utils/utils';
import { ApiService } from '../../../../api/api.service';
import { config } from '../../../../app.config';

@Component({
    selector: 'file-uploader',
    templateUrl: './file.html',
    styleUrls: ['./file.scss']
})
export class File implements OnInit {

    // TODO handle multiple / non multiple upload

    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('fileUpload') public _fileUpload: ElementRef;

    files: UploadFile[] = [];
    uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
    dragOver: boolean;
    uploadedFiles: UploadedFile[] = [];

    static composeFilePath(file: any) {
        return config.api[config.env].baseFilesUrl + file.container + '/' + file.name;
    }

    constructor(protected _renderer: Renderer,
                protected _apiService: ApiService,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this.form.controls[this.field.key].valueChanges
            .first()
            .subscribe(
                data => {
                    if (this.uploadedFiles.length === 0) {
                        if (data instanceof Array) {
                            data.forEach((item) => {
                                this.addToUpdatedFiles({
                                    id: item.id,
                                    container: item.container,
                                    path: File.composeFilePath(item),
                                    remoteName: item.name,
                                    name: item.originalName,
                                    type: item.type
                                });
                            });
                        } else {
                            this.addToUpdatedFiles({
                                id: data.id,
                                container: data.container,
                                path: File.composeFilePath(data),
                                remoteName: data.name,
                                name: data.originalName,
                                type: data.type
                            });
                        }
                        this.updateFormValue();
                    }
                }
            );
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
            case 'allAddedToQueue': {
                this.startUpload();
                this._fileUpload.nativeElement.value = ''; // Clear always file input value to avoid errors
            }
                break;
            case 'addedToQueue': {
                this.files.push(output.file);
            }
                break;
            case 'uploading': {
                const index = this.files.findIndex(file => file.id === output.file.id);
                this.files[index] = output.file;
            }
                break;
            case 'removed': {
                this.files = this.files.filter((file: UploadFile) => file !== output.file);
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
            case 'done': {
                this.handleResponse(output.file);
            }
                break;
            default: {
            }
                break;
        }
    }

    startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: this._apiService.composeUrl(this.field.options.api.upload),
            method: 'POST',
            concurrency: 1
        };

        this.uploadInput.emit(event);
    }

    cancelUpload(file: UploadedFile): void {
        this._apiService.delete(this.field.options.api.delete + '/' + file.id)
            .subscribe(
                res => {
                    this._toastManager.success(file.name + ' deleted successfully');
                    this.removeFromUpdatedFiles(file);
                },
                error => {
                    this._toastManager.error("Can't delete " + file.name + ', try again later');
                }
            );
    }

    handleResponse(file: UploadFile): void {
        if (file.response.error) {
            this._toastManager.error(file.response.error.message);
        } else {
            this.addToUpdatedFiles({
                id: file.response.id,
                container: file.response.container,
                path: File.composeFilePath(file.response),
                remoteName: file.response.name,
                name: file.response.originalName,
                type: file.response.type
            });
            this._toastManager.success(file.name + ' uploaded');
        }
    }

    removeFromUpdatedFiles(deletedFile: UploadedFile): void {
        this.uploadedFiles = Utils.removeObjectFromArray(deletedFile, this.uploadedFiles);
        this.updateFormValue();
    }

    addToUpdatedFiles(file: any): void {
        this.uploadedFiles.push(file);
        this.updateFormValue();
    }

    updateFormValue(): void {
        this.form.controls[this.field.key].setValue(this.uploadedFiles);
    }
}

export interface UploadedFile {
    id: number;
    path: string;
    remoteName: string;
    name: string;
    type: string;
    container: string;
}
