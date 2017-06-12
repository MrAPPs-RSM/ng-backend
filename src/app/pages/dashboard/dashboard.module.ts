import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { DoughnutChart } from './doughnutChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { TodoService } from './todo/todo.service';
import { UsersMapService } from './usersMap/usersMap.service';
import { DashboardResolver } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        PopularApp,
        PieChart,
        DoughnutChart,
        UsersMap,
        LineChart,
        Feed,
        Todo,
        Dashboard
    ],
    providers: [
        DashboardResolver,
        FeedService,
        LineChartService,
        TodoService,
        UsersMapService
    ]
})
export class DashboardModule {
}
