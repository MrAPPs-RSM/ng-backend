import {
    Component, ElementRef, EventEmitter, Input, OnInit, Renderer, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UploadOutput, UploadInput, UploadFile} from 'ngx-uploader';
import {ToastHandler, ModalHandler} from '../../../../theme/services';

import {FormGroup} from '@angular/forms';
import {Utils} from '../../../../utils/utils';
import {ApiService} from '../../../../api/api.service';
import {config} from '../../../../app.config';

@Component({
    selector: 'file-uploader',
    templateUrl: './file.html',
    styleUrls: ['./file.scss'],
    encapsulation: ViewEncapsulation.None
})
export class File implements OnInit {

    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('fileUpload') public _fileUpload: ElementRef;

    files: UploadFile[] = [];
    uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
    dragOver: boolean;
    uploadedFiles: UploadedFile[] = [];
    showProgress: boolean = false;

    static composeFilePath(file: any) {
        if (!file.url) {
            if (file.thumbnails) {
                return file.thumbnails.small;
            } else {
                let name = file.name ? file.name : file.hash + '.' + file.extension;
                return config.api[config.env].baseFilesUrl + name;
            }
        } else {
            return file.url;
        }
    }

    constructor(protected _renderer: Renderer,
                protected _apiService: ApiService,
                protected _modalHandler: ModalHandler,
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
                                    type: item.type ? item.type : item.extension
                                });
                            });
                        } else {
                            this.addToUpdatedFiles({
                                id: data.id,
                                container: data.container,
                                path: File.composeFilePath(data),
                                remoteName: data.name,
                                name: data.originalName,
                                type: data.type ? data.type : data.extension ? data.extension : data.mimeType
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
                this._fileUpload.nativeElement.value = '';
            }
                break;
            case 'addedToQueue': {
                // TODO fix with drag & drop and only single file
                if (this.field.options.multiple ||
                    (!this.field.options.multiple && this.uploadedFiles.length === 0)) {
                    this.files.push(output.file);
                } else {
                    this._fileUpload.nativeElement.value = '';
                    this._modalHandler.alert('Alert', 'Max number of files: 1');
                }
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
                this.showProgress = false;
                this.handleResponse(output.file);
            }
                break;
            default: {
            }
                break;
        }
    }

    startUpload(): void {
        this.showProgress = true;
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
            if (file.response.id) {
                // Local storage File handler
                this.addToUpdatedFiles({
                    id: file.response.id,
                    container: file.response.container,
                    path: File.composeFilePath(file.response),
                    remoteName: file.response.name,
                    name: file.response.originalName,
                    type: file.response.type
                });
            } else {
                // Google cloud storage file handler
                this.addToUpdatedFiles({
                    id: file.response.media.id,
                    container: file.response.file.container,
                    path: File.composeFilePath(file.response.file),
                    remoteName: file.response.media.name,
                    name: file.response.media.originalName,
                    type: file.response.media.mimeType
                });
            }
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
        this.form.controls[this.field.key].setValue(this.uploadedFiles.length > 0 ? this.uploadedFiles : null);
    }

    retryUrl($event: any, url: string): void {
        setTimeout(() => {
            $event.target.src = url;
        }, 2000);
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
