import { Component, Input } from '@angular/core';

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';

@Component({
    selector: 'pie-chart',
    templateUrl: './pieChart.html'
})

export class PieChart {

    @Input() charts: Array<Object>;
    private _init = false;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this._init) {
            this._loadPieCharts();
            this._init = true;
        }
    }

    private _loadPieCharts() {
        jQuery('.chart').each(function () {
            let chart = jQuery(this);
            chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: '#209e91',
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 8,
                lineCap: 'round',
            });
        });
    }
}
