import { Component, ViewChild, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../../../api';

@Component({
    selector: 'file-uploader',
    styleUrls: ['./file.scss'],
    templateUrl: './file.html',
})
export class File implements OnInit{

    @Input() form: FormGroup;
    @Input() field: any = {};
    @ViewChild('fileUpload') public _fileUpload: ElementRef;
    @ViewChild('inputText') public _inputText: ElementRef;

    private fileUploaderOptions: NgUploaderOptions;

    private files: FileList;
    private uploadedFiles: any[] = [];
    private uploadFileInProgress: boolean = false;
    private progressValue: number = 0;
    private uploadCompleted: boolean = false;
    private formValue: any[] = [];

    constructor(protected _renderer: Renderer, protected _apiService: ApiService) {
    }

    ngOnInit() {
        this.fileUploaderOptions = {
            url: this.field.options.dataEndpoint,
            autoUpload: false
        };
    }

    bringFileSelector(): boolean {
        this._renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    }

    showFileName() {
        let names = [];
        Object.keys(this.files).forEach((key) => {
            this.formValue.push(this.files[key]);
            names.push(this.files[key].name);
        });
        this._inputText.nativeElement.value = names.join(', ');
    }

    beforeFileUpload(uploadingFile: any): void {
        this.files = this._fileUpload.nativeElement.files;
        if (this.files.length) {
            this.showFileName();
        }
    }

    uploadQueue(): void {
        console.log('uploadQueue');
        this.uploadFileInProgress = true;
        if (this.files.length) {
            Object.keys(this.files).forEach((key) => {
                this.fakeUploadFile(this.files[key]);
            });
        }
    }

    fakeUploadFile(file: any): void {
        console.log('uploading:' + file.name);
        let i = 1;
        let loop = () => {
            setTimeout(() => {
                i++;
                this.progressValue = i * 10;
                if (i < 10) loop();
                else {
                    this.onUploadFileCompleted(file);
                }
            }, 100);
        };
        loop();
    }

    uploadFile(file: any): void {
        let formData: FormData = new FormData();
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
    }

    onUploadFileCompleted(file: any): void {
        console.log('finishing:' + file.name);
        this.uploadedFiles.push(file);
        if (this.uploadedFiles.length === this.files.length) {
            console.log('completed all');
            this.uploadFileInProgress = false;
            this.uploadCompleted = true;
            this.form.controls[this.field.key].setValue(this.formValue);
        }
    }
}
