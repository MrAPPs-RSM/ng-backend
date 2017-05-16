import { Injectable } from '@angular/core';

import { config } from '../app.config';
import { ApiService } from '../api';
import { Router } from '@angular/router';
import { BaMenuService } from '../theme/services';

@Injectable()
export class SetupService {

    private apiName: string = 'setup';

    private data: BackendData = {
        sections: [
            {
                children: [
                    {
                        params: {
                            menu: {
                                order: 0,
                                expanded: false,
                                selected: false,
                                sidebar: true,
                                icon: "ion-android-home",
                                title: "Dashboard"
                            }
                        },
                        type: "dashboard",
                        path: "dashboard"
                    },
                    {
                        "params": {
                            "form": {
                                "fields": [
                                    {
                                        "marker": {
                                            "draggable": true,
                                            "lng": 12.447509765625,
                                            "lat": 43.929549935614595
                                        },
                                        "options": {
                                            "defaultLng": 12.447509765625,
                                            "defaultLat": 43.929549935614595,
                                            "zoom": 8
                                        },
                                        "validators": {
                                            "required": true
                                        },
                                        "lng": {
                                            "placeholder": "Insert longitude",
                                            "label": "Longitude",
                                            "key": "lng"
                                        },
                                        "lat": {
                                            "placeholder": "Insert latitude",
                                            "label": "Latitude",
                                            "key": "lat"
                                        },
                                        "type": "lat_lng"
                                    }
                                ]
                            },
                            "api": {
                                "name": "maps"
                            },
                            "menu": {
                                "order": 100,
                                "selected": false,
                                "icon": "ion-location",
                                "sidebar": true,
                                "title": "Maps"
                            }
                        },
                        "type": "form",
                        "path": "maps"
                    },
                    {
                        "params": {
                            "form": {
                                "fields": [
                                    {
                                        "validators": {
                                            "required": true
                                        },
                                        "options": {
                                            "api": {
                                                "upload": "/upload",
                                                "delete": "/delete"
                                            },
                                            "multiple": true
                                        },
                                        "label": "File upload",
                                        "key": "file",
                                        "type": "file"
                                    }
                                ]
                            },
                            "api": {
                                "name": "files"
                            },
                            "menu": {
                                "order": 200,
                                "selected": false,
                                "icon": "ion-document-text",
                                "sidebar": true,
                                "title": "File upload"
                            }
                        },
                        "type": "form",
                        "path": "files"
                    },
                    {
                        "children": [
                            {
                                "params": {
                                    "table": {
                                        "columns": {
                                            "id": {
                                                "type": "number",
                                                "title": "ID"
                                            },
                                            "firstName": {
                                                "type": "string",
                                                "title": "First Name"
                                            },
                                            "lastName": {
                                                "filter": {
                                                    "config": {
                                                        "dataEndpoint": "http://beta.json-generator.com/api/json/get/4yhx6nC6z",
                                                        "selectText": "Select last name..."
                                                    },
                                                    "type": "list"
                                                },
                                                "type": "string",
                                                "title": "Last Name"
                                            },
                                            "email": {
                                                "type": "string",
                                                "title": "E-mail"
                                            },
                                            "username": {
                                                "type": "string",
                                                "title": "Username"
                                            },
                                            "age": {
                                                "filter": false,
                                                "type": "number",
                                                "title": "Age"
                                            },
                                            "active": {
                                                "filter": {
                                                    "type": "checkbox"
                                                },
                                                "type": "boolean",
                                                "title": "Active"
                                            }
                                        },
                                        "actions": {
                                            "position": "right",
                                            "delete": true,
                                            "edit": true,
                                            "add": true,
                                            "columnTitle": "Actions"
                                        }
                                    },
                                    "api": {
                                        "name": "users"
                                    },
                                    "menu": {
                                        "sidebar": true,
                                        "title": "Users list"
                                    }
                                },
                                "type": "list",
                                "path": "list"
                            },
                            {
                                "params": {
                                    "form": {
                                        "fields": [
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "key": "list-details",
                                                "type": "list_details",
                                                "placeholder": "Select friends",
                                                "label": "Friends",
                                                "options": {
                                                    "noDataMessage": "No friend selected",
                                                    "actionsTitle": "Actions",
                                                    "columns": {
                                                        "id": {
                                                            "type": "number",
                                                            "title": "ID",
                                                            "filter": false
                                                        },
                                                        "username": {
                                                            "type": "string",
                                                            "title": "Username",
                                                            "filter": false
                                                        },
                                                    },
                                                    "data": [
                                                        {
                                                            "text": "John Doe",
                                                            "id": 1
                                                        },
                                                        {
                                                            "text": "Tim Cook",
                                                            "id": 2
                                                        },
                                                        {
                                                            "text": "Bill Gates",
                                                            "id": 3
                                                        },
                                                        {
                                                            "text": "Didier Drogba",
                                                            "id": 4
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert first name here...",
                                                "label": "First name",
                                                "key": "firstName",
                                                "type": "text"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert last name here...",
                                                "label": "Last name",
                                                "key": "lastName",
                                                "type": "text"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert email here...",
                                                "label": "Email",
                                                "key": "email",
                                                "type": "email"
                                            },
                                            {
                                                "validators": {
                                                    "required": false
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert url here...",
                                                "label": "Url",
                                                "key": "url",
                                                "type": "url"
                                            },
                                            {
                                                "validators": {
                                                    "max": 10,
                                                    "min": 5,
                                                    "required": true
                                                },
                                                "label": "Number",
                                                "placeholder": "Insert number here...",
                                                "key": "number",
                                                "type": "number"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "options": {
                                                    "cols": 10,
                                                    "rows": 5
                                                },
                                                "label": "Description",
                                                "key": "textarea",
                                                "type": "textarea"
                                            },
                                            {
                                                "confirm": {
                                                    "errorMessage": "Password don't match",
                                                    "placeholder": "Confirm password here...",
                                                    "label": "Confirm password",
                                                    "key": "password_confirm",
                                                    "class": "col-sm-6"
                                                },
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert password here...",
                                                "label": "Password",
                                                "key": "password",
                                                "type": "password"
                                            },
                                            {
                                                "disabled": false,
                                                "checked": true,
                                                "class": "col-sm-12",
                                                "label": "Checkbox test",
                                                "key": "checkbox",
                                                "type": "checkbox"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "multiple": true,
                                                "options": [
                                                    {
                                                        "text": "Amsterdam",
                                                        "id": 1
                                                    },
                                                    {
                                                        "text": "Bradford",
                                                        "id": 2
                                                    },
                                                    {
                                                        "text": "Dortmund",
                                                        "id": 3
                                                    },
                                                    {
                                                        "text": "Marseille",
                                                        "id": 4
                                                    }
                                                ],
                                                "class": "col-sm-12",
                                                "placeholder": "No city selected",
                                                "label": "Select a city",
                                                "key": "select",
                                                "type": "select"
                                            }
                                        ]
                                    },
                                    "api": {
                                        "name": "users"
                                    },
                                    "menu": {
                                        "sidebar": true,
                                        "title": "Create user"
                                    }
                                },
                                "type": "form",
                                "path": "create"
                            },
                            {
                                "params": {
                                    "form": {
                                        "fields": [
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert first name here...",
                                                "label": "First name",
                                                "key": "firstName",
                                                "type": "text"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert last name here...",
                                                "label": "Last name",
                                                "key": "lastName",
                                                "type": "text"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert email here...",
                                                "label": "Email",
                                                "key": "email",
                                                "type": "email"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "class": "col-sm-6",
                                                "placeholder": "Insert password here...",
                                                "label": "Password",
                                                "key": "password",
                                                "type": "password"
                                            },
                                            {
                                                "disabled": false,
                                                "checked": true,
                                                "class": "col-sm-12",
                                                "label": "Checkbox test",
                                                "key": "checkbox",
                                                "type": "checkbox"
                                            },
                                            {
                                                "validators": {
                                                    "required": true
                                                },
                                                "multiple": false,
                                                "options": [
                                                    {
                                                        "text": "Amsterdam",
                                                        "id": 1
                                                    },
                                                    {
                                                        "text": "Bradford",
                                                        "id": 2
                                                    },
                                                    {
                                                        "text": "Dortmund",
                                                        "id": 3
                                                    },
                                                    {
                                                        "text": "Marseille",
                                                        "id": 4
                                                    }
                                                ],
                                                "class": "col-sm-12",
                                                "placeholder": "No city selected",
                                                "label": "Select a city",
                                                "key": "select",
                                                "type": "select"
                                            }
                                        ]
                                    },
                                    "api": {
                                        "name": "users"
                                    },
                                    "menu": {
                                        "sidebar": false,
                                        "title": "Edit user"
                                    }
                                },
                                "type": "form",
                                "path": "edit"
                            }
                        ],
                        "params": {
                            "menu": {
                                "order": 200,
                                "expanded": true,
                                "selected": false,
                                "sidebar": true,
                                "icon": "ion-person",
                                "title": "Users"
                            }
                        },
                        "type": "group",
                        "path": "users"
                    }
                ],
                "path": "pages"
            }
        ],
        "settings": {
            "title": "Ng2Backend"
        }
    };

    constructor(
        private _router: Router,
        private _apiService: ApiService,
        private _baMenuService: BaMenuService) {
    }

    public setup(): Promise<any> {
        return new Promise ((resolve, reject) => {

            setTimeout(() => {
                this.loadRoutes(this.data);
                this._baMenuService.loadSidebar(this.data);
                resolve(this.data.settings);
            }, 100);

            /* this._apiService.get(this.apiName, true)
                .subscribe(
                    data => {
                        this.loadRoutes(data);
                        this._baMenuService.loadSidebar(data);
                        resolve(data.settings);
                    },
                    error => {
                        console.log(error);
                    }
                );*/
        });
    }

    public loadRoutes(data: BackendData){
        console.log('Loading routes...');

        let routerConfig = this._router.config;

        // Pages defined in pages.routing
        let pagesRoute = this.getPages(routerConfig);
        let standardPages = pagesRoute.children;

        // Pages defined from retrieved data
        let apiPages = this.getPages(data.sections).children;

        apiPages.map(function (item) {
            if (item.type === config.pageTypes.group) {
                if (item.children) {
                    item.children.map(function (child) {
                        for (let j = 0; j < standardPages.length; j++){
                            if (standardPages[j].path === config.pageTypes[child.type]) {
                                let path = child.path === 'edit' ? child.path + '/:id' : child.path;
                                let childPage = {
                                    path: item.path + '/' + path,
                                    loadChildren: standardPages[j].loadChildren,
                                    data: child.params
                                };
                                standardPages.push(childPage);
                                break;
                            }
                        }
                    });
                }
            } else {
                for (let i = 0; i < standardPages.length; i++) {
                    if (standardPages[i].path === config.pageTypes[item.type]) {
                        let page = {
                            path: item.path,
                            loadChildren: standardPages[i].loadChildren,
                            data: item.params
                        };
                        standardPages.push(page);
                        break;
                    }
                }
            }
        });

        // Deleting default pages from config
        standardPages.splice(1, 3);
        pagesRoute.children = standardPages;
        routerConfig[1] = pagesRoute;
        this._router.resetConfig(routerConfig);
    }

    private getPages(array: any[]): any {
        let pages = {};
        array.forEach(item => {
            if (item.path === 'pages') {
                pages = item;
            }
        });
        return pages;
    }
}

// Interface for type safety
interface BackendData {
    settings: {
        title?: string
    },
    sections: any[];
}
