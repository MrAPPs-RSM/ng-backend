export let setup = {
    "settings": {
        "title": "Ng2Backend"
    },
    "sections": [
        {
            "path": "pages",
            "children": [
                {
                    "path": "dashboard",
                    "type": "dashboard",
                    "params": {
                        "menu": {
                            "title": "Dashboard",
                            "icon": "ion-android-home",
                            "sidebar": true,
                            "selected": false,
                            "expanded": false,
                            "order": 0
                        }
                    }
                },
                {
                    "path": "maps",
                    "type": "form",
                    "params": {
                        "menu": {
                            "title": "Maps",
                            "sidebar": true,
                            "icon": "ion-location",
                            "selected": false,
                            "order": 100
                        },
                        "api": {
                            "name": "maps"
                        },
                        "form": {
                            "fields": [
                                {
                                    "type": "lat_lng",
                                    "lat": {
                                        "key": "lat",
                                        "label": "Latitude",
                                        "placeholder": "Insert latitude"
                                    },
                                    "lng": {
                                        "key": "lng",
                                        "label": "Longitude",
                                        "placeholder": "Insert longitude"
                                    },
                                    "validators": {
                                        "required": true
                                    },
                                    "options": {
                                        "zoom": 8,
                                        "defaultLat": 43.929549935615,
                                        "defaultLng": 12.447509765625
                                    },
                                    "marker": {
                                        "lat": 43.929549935615,
                                        "lng": 12.447509765625,
                                        "draggable": true
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "path": "calendar",
                    "type": "form",
                    "params": {
                        "menu": {
                            "title": "Calendar",
                            "sidebar": true,
                            "icon": "ion-document-text",
                            "selected": false,
                            "order": 200
                        },
                        "api": {
                            "name": "files"
                        },
                        "form": {
                            "options": {
                                "submitLabel": "Save"
                            },
                            "fields": [
                                {
                                    "key": "calendar",
                                    "type": "calendar",
                                    "label": "Calendar"
                                }
                            ]
                        }
                    }
                },
                {
                    "path": "files",
                    "type": "form",
                    "params": {
                        "menu": {
                            "title": "File upload",
                            "sidebar": true,
                            "icon": "ion-document-text",
                            "selected": false,
                            "order": 200
                        },
                        "api": {
                            "name": "files"
                        },
                        "form": {
                            "options": {
                                "submitLabel": "Save files"
                            },
                            "fields": [
                                {
                                    "key": "file",
                                    "type": "file",
                                    "label": "File upload",
                                    "validators": {
                                        "required": true
                                    },
                                    "options": {
                                        "api": {
                                            "upload": "/upload",
                                            "delete": "/delete"
                                        },
                                        "multiple": true,
                                        "labels": {
                                            "dragDropMessage": "Drag & drop files here",
                                            "selectMessage": "or select files",
                                            "uploadedFiles": "File caricati"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "path": "users",
                    "type": "group",
                    "params": {
                        "menu": {
                            "title": "Users",
                            "icon": "ion-person",
                            "sidebar": true,
                            "selected": false,
                            "expanded": true,
                            "order": 200
                        }
                    },
                    "children": [
                        {
                            "path": "list",
                            "type": "list",
                            "params": {
                                "menu": {
                                    "title": "Users list",
                                    "sidebar": true
                                },
                                "api": {
                                    "name": "users"
                                },
                                "table": {
                                    "actions": {
                                        "columnTitle": "Actions",
                                        "add": true,
                                        "edit": true,
                                        "delete": true,
                                        "position": "right"
                                    },
                                    "columns": {
                                        "active": {
                                            "title": "Active",
                                            "type": "boolean",
                                            "filter": {
                                                "type": "checkbox"
                                            }
                                        },
                                        "age": {
                                            "title": "Age",
                                            "type": "number",
                                            "filter": false
                                        },
                                        "username": {
                                            "title": "Username",
                                            "type": "string"
                                        },
                                        "email": {
                                            "title": "E-mail",
                                            "type": "string"
                                        },
                                        "lastName": {
                                            "title": "Last Name",
                                            "type": "string",
                                            "filter": {
                                                "type": "list",
                                                "config": {
                                                    "selectText": "Select last name...",
                                                    "dataEndpoint": "http:\/\/beta.json-generator.com\/api\/json\/get\/4yhx6nC6z"
                                                }
                                            }
                                        },
                                        "firstName": {
                                            "title": "First Name",
                                            "type": "string"
                                        },
                                        "id": {
                                            "title": "ID",
                                            "type": "number"
                                        }
                                    }
                                }
                            }
                        },
                        {
                            "path": "create",
                            "type": "form",
                            "params": {
                                "menu": {
                                    "title": "Create user",
                                    "sidebar": true
                                },
                                "api": {
                                    "name": "users"
                                },
                                "form": {
                                    "fields": [
                                        {
                                            "options": {
                                                "data": [
                                                    {
                                                        "id": 1,
                                                        "text": "John Doe"
                                                    },
                                                    {
                                                        "id": 2,
                                                        "text": "Tim Cook"
                                                    },
                                                    {
                                                        "id": 3,
                                                        "text": "Bill Gates"
                                                    },
                                                    {
                                                        "id": 4,
                                                        "text": "Didier Drogba"
                                                    }
                                                ],
                                                "columns": {
                                                    "username": {
                                                        "filter": false,
                                                        "title": "Username",
                                                        "type": "string"
                                                    },
                                                    "id": {
                                                        "filter": false,
                                                        "title": "ID",
                                                        "type": "number"
                                                    }
                                                },
                                                "actionsTitle": "Actions",
                                                "noDataMessage": "No friend selected"
                                            },
                                            "label": "Friends",
                                            "placeholder": "Select friends",
                                            "type": "list_details",
                                            "key": "list-details",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "text",
                                            "key": "firstName",
                                            "label": "First name",
                                            "placeholder": "Insert first name here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "text",
                                            "key": "lastName",
                                            "label": "Last name",
                                            "placeholder": "Insert last name here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "email",
                                            "key": "email",
                                            "label": "Email",
                                            "placeholder": "Insert email here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "url",
                                            "key": "url",
                                            "label": "Url",
                                            "placeholder": "Insert url here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": false
                                            }
                                        },
                                        {
                                            "type": "number",
                                            "key": "number",
                                            "placeholder": "Insert number here...",
                                            "label": "Number",
                                            "validators": {
                                                "required": true,
                                                "min": 5,
                                                "max": 10
                                            }
                                        },
                                        {
                                            "type": "textarea",
                                            "key": "textarea",
                                            "label": "Description",
                                            "options": {
                                                "rows": 5,
                                                "cols": 10
                                            },
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "password",
                                            "key": "password",
                                            "label": "Password",
                                            "placeholder": "Insert password here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            },
                                            "confirm": {
                                                "class": "col-sm-6",
                                                "key": "password_confirm",
                                                "label": "Confirm password",
                                                "placeholder": "Confirm password here...",
                                                "errorMessage": "Password don't match"
                                            }
                                        },
                                        {
                                            "type": "checkbox",
                                            "key": "checkbox",
                                            "label": "Checkbox test",
                                            "class": "col-sm-12",
                                            "checked": true,
                                            "disabled": false
                                        },
                                        {
                                            "type": "select",
                                            "key": "select",
                                            "label": "Select a city",
                                            "placeholder": "No city selected",
                                            "class": "col-sm-12",
                                            "options": [
                                                {
                                                    "id": 1,
                                                    "text": "Amsterdam"
                                                },
                                                {
                                                    "id": 2,
                                                    "text": "Bradford"
                                                },
                                                {
                                                    "id": 3,
                                                    "text": "Dortmund"
                                                },
                                                {
                                                    "id": 4,
                                                    "text": "Marseille"
                                                }
                                            ],
                                            "multiple": false,
                                            "validators": {
                                                "required": true
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "path": "edit",
                            "type": "form",
                            "params": {
                                "menu": {
                                    "title": "Edit user",
                                    "sidebar": false
                                },
                                "api": {
                                    "name": "users"
                                },
                                "form": {
                                    "fields": [
                                        {
                                            "type": "text",
                                            "key": "firstName",
                                            "label": "First name",
                                            "placeholder": "Insert first name here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "text",
                                            "key": "lastName",
                                            "label": "Last name",
                                            "placeholder": "Insert last name here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "email",
                                            "key": "email",
                                            "label": "Email",
                                            "placeholder": "Insert email here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "password",
                                            "key": "password",
                                            "label": "Password",
                                            "placeholder": "Insert password here...",
                                            "class": "col-sm-6",
                                            "validators": {
                                                "required": true
                                            }
                                        },
                                        {
                                            "type": "checkbox",
                                            "key": "checkbox",
                                            "label": "Checkbox test",
                                            "class": "col-sm-12",
                                            "checked": true,
                                            "disabled": false
                                        },
                                        {
                                            "type": "select",
                                            "key": "select",
                                            "label": "Select a city",
                                            "placeholder": "No city selected",
                                            "class": "col-sm-12",
                                            "options": [
                                                {
                                                    "id": 1,
                                                    "text": "Amsterdam"
                                                },
                                                {
                                                    "id": 2,
                                                    "text": "Bradford"
                                                },
                                                {
                                                    "id": 3,
                                                    "text": "Dortmund"
                                                },
                                                {
                                                    "id": 4,
                                                    "text": "Marseille"
                                                }
                                            ],
                                            "multiple": false,
                                            "validators": {
                                                "required": true
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
