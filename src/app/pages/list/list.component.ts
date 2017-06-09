import { Component, OnInit } from '@angular/core';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api';
import { ToastHandler, ModalHandler } from '../../theme/services';
import { ServerDataSource } from './data-source';
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
            if (key === 'add' || key === 'edit' || key === 'delete') {
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
        this.settings.actions = actions;
        this.settings.noDataMessage =
            this.params.table.noDataMessage ? this.params.table.noDataMessage : 'No data found';
        this.settings.columns = this.params.table.columns;
    }

    loadData(): void {
        this.source = new ServerDataSource(
            this._toastManager,
            this._route,
            this._apiService,
            this.params.api
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
        this._modalHandler.confirm('Delete item ' + event.data.id)
            .then(() => {
                this._apiService.delete(this.params.api.endpoint + '/' + event.data.id)
                    .subscribe(
                        res => {
                            this._toastManager.success('Item deleted successfully');
                            this.source.refresh();
                        },
                        error => {
                            this._toastManager.error("Can't delete item, try again later");
                        }
                    );
            })
            .catch(() => {
            });
    }
}
