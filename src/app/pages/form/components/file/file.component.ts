import { Component, ElementRef, Input, OnInit, ViewChild, Renderer } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'file-uploader',
    styleUrls: ['./file.scss'],
    templateUrl: './file.html'
})
export class File implements OnInit{
    @Input() form: FormGroup;
    @Input() field: any = {};

    @ViewChild('fileUpload') public fileUpload: ElementRef;
    @ViewChild('inputText') public inputText: ElementRef;

    public uploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;

    constructor(protected _renderer: Renderer) {}

    ngOnInit() {
        this.uploader = new FileUploader({url: 'https://evening-anchorage-3159.herokuapp.com/api/'});
    }

    bringFileSelector(): boolean {
        this._renderer.invokeElementMethod(this.fileUpload.nativeElement, 'click');
        return false;
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}