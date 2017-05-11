import { Component, ViewChild, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../../../api';
import { Utils } from '../../../../utils';

@Component({
    selector: 'file-uploader',
    styleUrls: ['./file.scss'],
    templateUrl: './file.html',
})
export class File implements OnInit {

    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('fileUpload') public _fileUpload: ElementRef;
    @ViewChild('inputText') public _inputText: ElementRef;

    private fileUploaderOptions: NgUploaderOptions;

    private files: FileList;
    private uploadedFiles: any[] = [];
    private formValue: any[] = [];
    private uploadInProgress: boolean = false;

    constructor(protected _renderer: Renderer, protected _apiService: ApiService) {
    }

    ngOnInit() {
        this.fileUploaderOptions = {
            url: this.field.options.dataEndpoint,
            autoUpload: false
        };
    }

    getUploadButtonClass(): string {
        let cssClass: string = '';
        switch (this.field.class ? this.field.class : '') {
            case 'col-sm-6':
            case 'col-sm-8':
            case 'col-sm-10': {
                cssClass = 'col-sm-4';
            }
                break;
            default: {
                cssClass = 'col-sm-2';
            }
        }
        return cssClass;
    }

    getUploadProgressClass(): string {
        let cssClass: string = '';
        switch (this.field.class ? this.field.class : '') {
            case 'col-sm-6':
            case 'col-sm-8':
            case 'col-sm-10': {
                cssClass = 'col-sm-8';
            }
                break;
            default: {
                cssClass = 'col-sm-10';
            }
        }
        return cssClass;
    }

    /**
     * Just to invoke file selection if click on button or input text
     * @returns {boolean}
     */
    bringFileSelector(): boolean {
        this._renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    }

    /**
     * Show selected file names on input text
     */
    showFileNames() {
        let names = [];
        Object.keys(this.files).forEach((key) => {
            this.formValue.push(this.files[key]);
            names.push(this.files[key].name);
        });
        this._inputText.nativeElement.value = names.join(', ');
    }

    /**
     * Method called when user select some files
     * @param uploadingFile
     */
    beforeFileUpload(uploadingFile: any): void {
        this.files = this._fileUpload.nativeElement.files;
        console.log(this.files);
        this.showFileNames();
    }

    /* TODO: disabled for bad ux
     Delete selected files

     get showClearButton() {
     return this.files ? this.files.length : false;
     }

     removeFiles() {
     this._fileUpload.nativeElement.value = '';
     this.files = this._fileUpload.nativeElement.files;
     this.formValue = [];
     this.showFileNames();
     }*/

    /**
     * Delete an uploaded file from server making an api DELETE
     * @param file
     */
    deleteFile(file: any): void {
        console.log('delete');
        console.log(file);
        let index = this.uploadedFiles.indexOf(file);
        this.uploadedFiles.splice(index, 1);
        // TODO: api call here to delete file from server
    }

    /**
     * Upload all files to server
     */
    uploadQueue(): void {
        console.log('uploadQueue');
        if (this.files.length) {
            Object.keys(this.files).forEach((key) => {
                this.uploadFile(this.files[key]);
            });
        }
    }

    /**
     * Upload single file to server
     * @param file
     */
    uploadFile(file: any): void {
        if (!Utils.containsObject(file, this.uploadedFiles)) {
            this.uploadInProgress = true;
            // TODO: api call here to upload file to server
            setTimeout(() => {
                console.log('uploading:' + file.name);
                this.onUploadFileCompleted(file);
            }, 1500);
        }
    }

    /*uploadFile(file: any): void {
     /*let formData: FormData = new FormData();
     formData.append('uploadFile', file, file.name);
     this._apiService.setHeaders([
     {name: 'Content-Type', value: 'multipart/form-data'},
     {name: 'Accept', value: 'application/json'},
     ]);
     this._apiService.post(
     this.fileUploaderOptions.url,
     formData,
     false
     )
     .subscribe(
     data => {
     if (data['done'] || data['abort'] || data['error']) {
     this.onUploadCompleted();
     } else {
     this.progressValue = data.progress.percent;
     }
     },
     error => {
     }
     );
     }*/

    /**
     * When file upload is completed
     * @param file
     */
    onUploadFileCompleted(file: any): void {
        console.log('finishing:' + file.name);
        this.uploadInProgress = false;
        this.uploadedFiles.push(file);
        if (this.uploadedFiles.length === this.files.length) {
            this.onUploadCompleted();
        }
    }

    /**
     * When all files were uploaded
     */
    onUploadCompleted(): void {
        console.log('uploaded all files');
        this.form.controls[this.field.key].setValue(this.formValue);
    }
}
