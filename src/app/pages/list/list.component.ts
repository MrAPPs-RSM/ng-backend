import { Component, OnInit } from '@angular/core';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api';
import { ToastHandler, ModalHandler } from '../../theme/services';
import { ServerDataSource } from './../ng2-smart-table';
import { TitleChecker } from '../services';

@Component({
    selector: 'list',
    templateUrl: './list.html',
})
export class List implements OnInit {

    settings = {
        mode: 'external',
        noDataMessage: '',
        add: {
            addButtonContent: '<span class="btn btn-xs btn-success"><i class="fa fa-plus-circle"></i></span>'
        },
        edit: {
            editButtonContent: '<span class="btn btn-xs btn-warning"><i class="fa fa-edit"></i></span>'
        },
        delete: {
            deleteButtonContent: '<span class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></span>'
        },
        custom: {
            customButtonContent: ''
        },
        actions: {},
        columns: {},
        pager: {
            perPage: 10
        }
    };

    source: ServerDataSource;

    params: any = {}; // Setup params

    constructor(protected _router: Router,
                protected _titleChecker: TitleChecker,
                protected _route: ActivatedRoute,
                protected _apiService: ApiService,
                protected _modalHandler: ModalHandler,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this.params = this._route.snapshot.data;
        this._titleChecker.setCorrectTitle(this._route, this.params);
        this.loadSettings();
        this.loadData();
    }

    loadSettings(): void {
        let actions = {};
        Object.keys(this.params.table.actions).forEach((key) => {
            if (key === 'add' || key === 'edit' || key === 'delete' || key === 'custom') {
                actions[key] = this.params.table.actions[key].enable;
                if (this.params.table.actions[key].style) {
                    let content = '<span class="btn btn-xs ' +
                        this.params.table.actions[key].style.button
                        + '"><i class="fa ' + this.params.table.actions[key].style.icon + '"></i></span>';
                    let contentKey = key + 'ButtonContent';
                    this.settings[key][contentKey] = content;
                }
            } else {
                actions[key] = this.params.table.actions[key];
            }
        });

        this.settings.columns = this.params.table.columns;
        this.settings.actions = actions;
        this.settings.noDataMessage = this.params.table.messages && this.params.table.messages.noData && this.params.table.messages.noData ? this.params.table.messages.noData : 'No data found';
        this.settings.pager.perPage =
            this.params.table.perPage ? this.params.table.perPage : this.settings.pager.perPage;
    }

    loadData(): void {
        this.source = new ServerDataSource(
            this._toastManager,
            this._route,
            this._apiService,
            this.params.api,
            this.params.table.enableDrag
        );
    }

    onRowDrop(event: any): void {
        this._apiService.patch(
            this.params.api.sortEndpoint,
            JSON.stringify({oldIndex: event.oldRowIndex, newIndex: event.newRowIndex})
        ).subscribe(
            res => {
                this.source.refresh();
            },
            error => {
                this._toastManager
                    .error(this.params.table.messages.dragError ? this.params.table.messages.dragError : 'Error while sorting');
            }
        );
    }

    onCreate(): void {
        this._router.navigate(['pages/' + this.params.table.actions.add.path]);
    }

    onEdit(event: any): void {
        this._router.navigate(
            ['pages/' + this.params.table.actions.edit.path + '/' + event.data.id]);
    }

    onDelete(event: any): void {
        this._modalHandler.confirm(
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalTitle ? this.params.table.messages.delete.modalTitle + event.data.id : 'Delete item ' + event.data.id,
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalBody ? this.params.table.messages.delete.modalBody : null,
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalConfirm ? this.params.table.messages.delete.modalConfirm : null,
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalDismiss ? this.params.table.messages.delete.modalDismiss : null
        )
            .then(() => {
                this._apiService.delete(this.params.api.endpoint + '/' + event.data.id)
                    .subscribe(
                        res => {
                            this._toastManager.success(this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.success ? this.params.table.messages.delete.success : null);
                            this.source.refresh();
                        },
                        error => {
                            this._toastManager.error(this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.fail ? this.params.table.messages.delete.fail : error);
                        }
                    );
            })
            .catch(() => {
            });
    }

    onCustom(event: any): void {
        let redirectTo = this.params.table.actions.custom.path;
        if (redirectTo.indexOf(':id') !== -1) {
            redirectTo = redirectTo.replace(':id', event.data.id);
        }
        this._router.navigate(['pages/' + redirectTo]);
    }
}
