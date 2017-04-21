import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SetupService } from '../../../setup';

@Injectable()
export class BaMenuService {
  menuItems = new BehaviorSubject<any[]>([]);

  protected _currentMenuItem = {};

  constructor(private _router: Router, private _setupService: SetupService) {
  }

  public loadMenu() {

    this.loadFakeMenu();

    /*this._setupService.setup()
        .subscribe(
            data => {
              // Creating sidebar
              let convertedRoutes = this.convertRoutesToMenus(_.cloneDeep(data));
              this.menuItems.next(convertedRoutes);
              // Updating routes
              this._setupService.updateRoutes(data);
            },
            error => {
              // This error might never happen, but in case redirect to login
              this._router.navigate(['login']);
            }
        );*/
  }

  private loadFakeMenu() {

    let data = [
      {
        path: 'pages',
        children: [
          {
            path: 'dashboard',
            type: 'dashboard',
            params: {
              menu: {
                title: 'Dashboard',
                icon: 'ion-android-home',
                sidebar: true,
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }, // Dashboard
          {
            path: 'users',
            type: 'group',
            params: {
              menu: {
                title: 'Users',
                icon: 'ion-person',
                sidebar: true,
                selected: false,
                expanded: true,
                order: 100
              }
            },
            children: [
              {
                path: 'list',
                type: 'list',
                params: {
                  menu: {
                    title: 'Users list',
                    sidebar: true
                  },
                  api: {
                    name: 'users'
                  },
                  table: {
                    actions: {
                      columnTitle: 'Actions',
                      add: true,
                      edit: true,
                      'delete': true,
                      position: 'right'
                    },
                    columns: {
                      active: {
                        title: 'Active',
                        type: 'boolean',
                        filter: {
                          type: 'checkbox'
                        }
                      },
                      age: {
                        title: 'Age',
                        type: 'number',
                        filter: false
                      },
                      username: {
                        title: 'Username',
                        type: 'string'
                      },
                      email: {
                        title: 'E-mail',
                        type: 'string'
                      },
                      lastName: {
                        title: 'Last Name',
                        type: 'string',
                        filter: {
                          type: 'list',
                          config: {
                            selectText: 'Select last name...',
                            dataEndpoint: 'http://beta.json-generator.com/api/json/get/4yhx6nC6z'
                          }
                        }
                      },
                      firstName: {
                        title: 'First Name',
                        type: 'string',
                        filter: {
                          type: 'list',
                          config: {
                            selectText: 'Select...',
                            dataEndpoint: 'http://beta.json-generator.com/api/json/get/4JAQ2206z'
                          }
                        }
                      },
                      id: {
                        title: 'ID',
                        type: 'number'
                      }
                    }
                  }
                }
              },
              {
                path: 'create',
                type: 'form',
                params: {
                  menu: {
                    title: 'Create user',
                    sidebar: true
                  },
                  api: {
                    name: 'users'
                  },
                  form: {
                    fields: [
                      {
                        type: 'text',
                        key: 'firstName',
                        label: 'First name',
                        placeholder: 'Insert first name here...',
                        'class': 'col-sm-6',
                        validators: {
                          required: true
                        }
                      },
                      {
                        type: 'text',
                        key: 'lastName',
                        label: 'Last name',
                        placeholder: 'Insert last name here...',
                        'class': 'col-sm-6',
                        validators: {
                          required: true
                        }
                      },
                      {
                        type: 'email',
                        key: 'email',
                        label: 'Email',
                        placeholder: 'Insert email here...',
                        'class': 'col-sm-12',
                        validators: {
                          required: true
                        }
                      },
                      {
                        type: 'checkbox',
                        key: 'checkbox',
                        label: 'Checkbox test',
                        'class': 'col-sm-12',
                        checked: true,
                        disabled: false
                      },
                      {
                        type: 'select',
                        key: 'select',
                        label: 'Select a city',
                        placeholder: 'No city selected',
                        'class': 'col-sm-12',
                        multiple: false,
                        validators: {
                          required: true
                        }
                      }
                    ]
                  }
                }
              },
              {
                path: 'edit',
                type: 'form',
                params: {
                  menu: {
                    title: 'Edit user',
                    sidebar: false
                  },
                  api: {
                    name: 'users'
                  },
                  form: {
                    fields: [
                      {
                        type: 'text',
                        key: 'firstName',
                        label: 'First name',
                        placeholder: 'Insert first name here...',
                        'class': 'col-sm-6',
                        validators: {
                          required: true,
                          minLength: 5,
                          maxLength: 10
                        }
                      },
                      {
                        type: 'text',
                        key: 'lastName',
                        label: 'Last name',
                        placeholder: 'Insert last name here...',
                        'class': 'col-sm-6',
                        validators: {
                          required: true
                        }
                      }
                    ]
                  }
                }
              }
            ]
          } // User group
        ]
      }
    ];

    // Creating sidebar
    let convertedRoutes = this.convertRoutesToMenus(_.cloneDeep(data));
    this.menuItems.next(convertedRoutes);
    // Updating routes
    this._setupService.updateRoutes(data);
  }

  public convertRoutesToMenus(routes: Routes): any[] {
    let items = this._convertArrayToItems(routes);
    return this._skipEmpty(items);
  }

  public getCurrentItem(): any {
    return this._currentMenuItem;
  }

  public selectMenuItem(menuItems: any[]): any[] {
    let items = [];
    menuItems.forEach((item) => {
      this._selectItem(item);

      if (item.selected) {
        this._currentMenuItem = item;
      }

      if (item.children && item.children.length > 0) {
        item.children = this.selectMenuItem(item.children);
      }
      items.push(item);
    });
    return items;
  }

  protected _skipEmpty(items: any[]): any[] {
    let menu = [];
    items.forEach((item) => {
      let menuItem;
      if (item.skip) {
        if (item.children && item.children.length > 0) {
          menuItem = item.children;
        }
      } else {
        menuItem = item;
      }

      if (menuItem) {
        menu.push(menuItem);
      }
    });

    return [].concat.apply([], menu);
  }

  protected _convertArrayToItems(routes: any[], parent?: any): any[] {
    let items = [];
    routes.forEach((route) => {
      items.push(this._convertObjectToItem(route, parent));
    });
    return items;
  }

  protected _convertObjectToItem(object, parent?: any): any {
    let item: any = {};
    if (object.params && object.params.menu && object.params.menu.sidebar === true) {
      // this is a menu object
      item = object.params.menu;
      item.route = object;
      delete item.route.params.menu;
    } else {
      item.route = object;
      item.skip = true;
    }

    // we have to collect all paths to correctly build the url then
    if (Array.isArray(item.route.path)) {
      item.route.paths = item.route.path;
    } else {
      item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
      if (!!item.route.path) item.route.paths.push(item.route.path);
    }

    if (object.children && object.children.length > 0) {
      item.children = this._convertArrayToItems(object.children, item);
    }

    let prepared = this._prepareItem(item);

    // if current item is selected or expanded - then parent is expanded too
    if ((prepared.selected || prepared.expanded) && parent) {
      parent.expanded = true;
    }

    return prepared;
  }

  protected _prepareItem(object: any): any {
    if (!object.skip) {
      object.target = object.target || '';
      object.pathMatch = object.pathMatch || 'full';
      return this._selectItem(object);
    }

    return object;
  }

  protected _selectItem(object: any): any {
    object.selected = this._router.isActive(
      this._router.createUrlTree(object.route.paths), object.pathMatch === 'full');
    return object;
  }
}
