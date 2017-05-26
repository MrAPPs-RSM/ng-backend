import { Component, OnInit } from '@angular/core';

import 'style-loader!./list.scss';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api';
import { ToastHandler } from '../../theme/services';
import { ServerDataSource } from './data-source';
import { TitleChecker } from '../services';

@Component({
    selector: 'list',
    templateUrl: './list.html',
})
export class List implements OnInit {

    settings = {
        mode: 'external',
        noDataMessage: 'No data found',
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
                protected _toastManager: ToastHandler
    ) {}

    ngOnInit() {
        this.params = this._route.snapshot.data;
        this._titleChecker.setCorrectTitle(this._route, this.params);
        this.loadActions();
        this.settings.columns = this.params.table.columns;
        this.loadData();
    }

    loadActions(): void {
        let actions = {};
        Object.keys(this.params.table.actions).forEach((key) => {
            if (key === 'add' || key === 'edit' || key === 'delete') {
                actions[key] = this.params.table.actions[key].enable;
            } else {
                actions[key] = this.params.table.actions[key];
            }
        });
        this.settings.actions = actions;
    }

    loadData(): void {
        this.source = new ServerDataSource(
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

        // TODO: add a real dialog
        if (window.confirm('Are you sure you want to delete?')) {

            this._apiService.delete(this.params.api.endpoint + '/' + event.data.id)
                .subscribe(
                    res => {
                        this._toastManager.info('Item deleted successfully');
                        this.source.refresh();
                    },
                    error => {
                        this._toastManager.error("Can't delete item, try again later");
                    }
                );
        }
    }
}
