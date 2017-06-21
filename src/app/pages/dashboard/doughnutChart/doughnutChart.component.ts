import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import 'style-loader!./doughnutChart.scss';
import { colorHelper } from '../../../theme/theme.constants';
import { ApiService } from '../../../api';
import { ToastHandler } from '../../../theme/services/';


@Component({
    selector: 'doughnut-chart',
    templateUrl: './doughnutChart.html'
})

export class DoughnutChart implements OnInit {

    @Input() config: any;
    items: any[] = [];
    isDataAvailable: boolean = false;

    constructor(protected _apiService: ApiService,
                protected _toastManager: ToastHandler) {
    }

    ngOnInit() {
        this._loadItems()
            .then((data) => {
                this.items = data;
                this._loadColors();

                if (this.items.length > 0) {
                    this.isDataAvailable = true;
                    setTimeout(() => {
                        this._loadDoughnutCharts();
                    }, 200);
                }
            })
            .catch((error) => {
                this._toastManager.error(error);
            });
    }

    private _loadItems(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.config.data instanceof Array) {
                resolve(this.config.data);
            } else {
                this._apiService.get(this.config.data)
                    .subscribe(
                        data => {
                            resolve(data);
                        },
                        error => {
                            reject(error);
                        }
                    );
            }
        });
    }

    private _loadColors(): void {
        this.items.forEach((item) => {
            item.color = colorHelper.random();
            item.highlight = colorHelper.shade(item.color, 30);
        });
    }

    private _loadDoughnutCharts(): void {
        let el = jQuery('#chart-area-' + this.config.id).get(0) as HTMLCanvasElement;
        new Chart(el.getContext('2d')).Doughnut(this.items, {
            segmentShowStroke: false,
            percentageInnerCutout: 64,
            responsive: true
        });
    }
}
