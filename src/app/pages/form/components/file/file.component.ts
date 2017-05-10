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

    get showClearButton() {
        return this.files ? this.files.length : false;
    }

    bringFileSelector(): boolean {
        this._renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    }

    showFileNames() {
        let names = [];
        Object.keys(this.files).forEach((key) => {
            this.formValue.push(this.files[key]);
            names.push(this.files[key].name);
        });
        this._inputText.nativeElement.value = names.join(', ');
    }

    beforeFileUpload(uploadingFile: any): void {
        this.files = this._fileUpload.nativeElement.files;
        console.log(this.files);
        this.showFileNames();
    }

    removeFiles() {
        this._fileUpload.nativeElement.value = '';
        this.files = this._fileUpload.nativeElement.files;
        this.formValue = [];
        this.showFileNames();
    }

    deleteFile(file: any): void {
        console.log('delete');
        console.log(file);
    }

    uploadQueue(): void {
        console.log('uploadQueue');
        if (this.files.length) {
            Object.keys(this.files).forEach((key) => {
                this.uploadFile(this.files[key]);
            });
        }
    }

    uploadFile(file: any): void {
        if (!Utils.containsObject(file, this.uploadedFiles)) {
            this.uploadInProgress = true;
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

    onUploadFileCompleted(file: any): void {
        console.log('finishing:' + file.name);
        this.uploadInProgress = false;
        this.uploadedFiles.push(file);
    }

    onUploadCompleted(): void {
        console.log('uploaded all files');
        this.form.controls[this.field.key].setValue(this.formValue);
    }
}
