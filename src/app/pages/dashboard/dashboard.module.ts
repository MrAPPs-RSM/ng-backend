import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PieChart } from './pieChart';
import { DoughnutChart } from './doughnutChart';
import { FeedService } from './feed/feed.service';
import { DashboardResolver } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        PieChart,
        DoughnutChart,
        Dashboard
    ],
    providers: [
        DashboardResolver
    ]
})
export class DashboardModule {
}
