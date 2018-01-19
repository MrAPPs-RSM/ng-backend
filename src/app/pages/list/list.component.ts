import {Component, OnDestroy, OnInit} from '@angular/core';

import 'style-loader!./list.scss';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api';
import {ToastHandler, ModalHandler} from '../../theme/services';
import {ServerDataSource} from './../components/ng2-smart-table';
import {TitleChecker, PageRefresh} from '../services';
import {ListPaging} from './services';
import {BaThemeSpinner} from '../../theme/services';

@Component({
    selector: 'list',
    templateUrl: './list.html',
})
export class List implements OnInit, OnDestroy {

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
            page: 1,
            perPage: 10
        }
    };

    source: ServerDataSource;

    params: any = {}; // Setup params

    constructor(protected _router: Router,
                protected _titleChecker: TitleChecker,
                protected _spinner: BaThemeSpinner,
                protected _listPaging: ListPaging,
                protected _pageRefreshService: PageRefresh,
                protected _route: ActivatedRoute,
                protected _apiService: ApiService,
                protected _modalHandler: ModalHandler,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this._spinner.hide();
        this.params.api = null;
        this.params = this._route.snapshot.data;
        this._titleChecker.setCorrectTitle(this._route, this.params);
        this.loadSettings();
        this.loadData();
    }

    ngOnDestroy() {
        this._listPaging.setPaging(this.source.getPaging());
        this._pageRefreshService.setLastPath(this._router.url);
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
        this.settings.pager = this._listPaging.getPaging();
    }

    loadData(): void {

        let api = {
            passCurrentId: this.params.api.passCurrentId,
            countEndpoint: this.params.api.endpoint + '/count',
            endpoint: this.params.api.endpoint,
            filter: this.params.api.filter,
            fixedQueryParam: this.params.api.fixedQueryParam
        };

        if (this.params.api.passCurrentId && this._route.params && this._route.params['value']) {
            if (isNaN(this.params.api.endpoint.slice(-1))) {
                api.endpoint = this.params.api.endpoint + '/' + this._route.params['value'].id;
            }

            if (isNaN(this.params.api.countEndpoint.slice(-1))) {
                api.countEndpoint = this.params.api.countEndpoint + '/' + this._route.params['value'].id;
            }
        }

        this.source = new ServerDataSource(
            this._toastManager,
            this._route,
            this._apiService,
            api,
            this.params.table.enableDrag
        );
    }

    onRowDrop(event: any): void {
        let sortEndpoint = this.params.api.sortEndpoint;
        if (this.params.api.passCurrentId && this._route.params && this._route.params['value']) {
            if (this._route.params['value'].id) {
                sortEndpoint += '/' + this._route.params['value'].id;
            }
        }

        this._apiService.patch(
            sortEndpoint,
            JSON.stringify({oldIndex: event.oldRowIndex, newIndex: event.newRowIndex})
        ).subscribe(
            res => {
                this.source.refresh();
            },
            error => {
                this._toastManager.error(this.params.table.messages.dragError ?
                    this.params.table.messages.dragError : 'Error while sorting');
            }
        );
    }

    onCreate(): void {
        let redirectTo = this.params.table.actions.add.path;

        if (redirectTo.indexOf(':id') !== -1) {
            redirectTo = redirectTo.replace(':id', this._route.params['value'].id);
        }
        this._router.navigate(['pages/' + redirectTo]);
    }

    onEdit(event: any): void {
        let redirectTo = this.params.table.actions.edit.path;

        if (typeof redirectTo === 'string') {
            if (redirectTo.indexOf(':id') !== -1) {
                redirectTo = redirectTo.replace(':id', event.data.id);
            }
            if (redirectTo.indexOf(':title') !== -1 && this.params.table.actions.edit.titleField) {
                redirectTo = redirectTo.replace(':title', event.data[this.params.table.actions.edit.titleField]);
            }
            this._router.navigate(['pages/' + redirectTo]);
        } else {
            /** In this case, the edit path must be composed by the obj passed, which
             * defines the name of the entity to edit and the ID of it. These 2 fields
             * must be present in the list
             */
            let path = event.data[redirectTo.entityName].toString().toLowerCase() + '/edit/' + event.data[redirectTo.entityId];
            this._router.navigate(['pages/' + path]);
        }
    }

    onDelete(event: any): void {
        this._modalHandler.confirm(
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalTitle ? this.params.table.messages.delete.modalTitle + event.data.id : 'Delete item ' + event.data.id,
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalBody ? this.params.table.messages.delete.modalBody : null,
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalConfirm ? this.params.table.messages.delete.modalConfirm : null,
            this.params.table.messages && this.params.table.messages.delete && this.params.table.messages.delete.modalDismiss ? this.params.table.messages.delete.modalDismiss : null
        )
            .then(() => {
                let path = this.params.api.endpoint + '/' + event.data.id;

                if (this.params.table.actions.delete && this.params.table.actions.delete.path) {
                    let deletePath = this.params.table.actions.delete.path;

                    if (typeof deletePath === 'string') {
                        path = deletePath + '/' + event.data.id;
                    } else {
                        /** In this case, the delete path must be composed by the obj passed, which
                         * defines the name of the entity to edit and the ID of it. These 2 fields
                         * must be present in the list
                         */
                        path = event.data[deletePath.entityName].toString().toLowerCase() + '/' + event.data[deletePath.entityId];
                    }
                }

                this._apiService.delete(path)
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
        if (typeof this.params.table.actions.custom.path !== 'undefined') {
            let redirectTo = this.params.table.actions.custom.path;
            if (redirectTo.indexOf(':id') !== -1) {
                redirectTo = redirectTo.replace(':id', event.data.id);
            }
            if (redirectTo.indexOf(':title') !== -1 && this.params.table.actions.custom.titleField) {
                redirectTo = redirectTo.replace(':title', event.data[this.params.table.actions.custom.titleField]);
            }
            this._router.navigate(['pages/' + redirectTo]);
        } else {
            if (typeof this.params.table.actions.custom.apiEndpoint !== 'undefined') {
                let endpoint = this.params.table.actions.custom.apiEndpoint.replace(':id', event.data.id);
                this._apiService.get(endpoint)
                    .subscribe(
                        data => {
                            this._toastManager.success(data.message ? data.message : null);
                        },
                        error => {
                            this._toastManager.error(error);
                        }
                    );
            }
        }
    }
}
