# NgBackend

## Setup

First, define in src/app.config.ts the enviroment (dev, prod)
and the base URL of your APIs

app.config.ts

```typescript
export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/'
        },
        prod: {
            baseUrl: 'api/backend/'
        }
    }
};

```

## APIs

To define API endpoints, you have to declare them in src/app.config.ts.
They must be defined like with the following structure:
 
```json
{
  "apiName": "apiEndpoint"
}
```

Examples:

```json
{
  "api": {
    "setup": "E1utOUgTG",
    "users": "4yHf-YBTz"
  }
}
```

Now, your src/app.config.ts should look like this:

```typescript
export let config = {
    env: 'dev',
    api: {
        dev: {
            baseUrl: 'http://beta.json-generator.com/api/json/get/',
            api: {
                setup: 'E1utOUgTG',
                users: '4yHf-YBTz',
            }
        },
        prod: {
            baseUrl: 'api/backend/',
            api: {
                setup: 'setup',
                users: 'users'
            }
        }
    }
};
```

##Login

**TODO**

## Sidebar and menu pages

To create the sidebar, you have to define a **setup** apiName in app.config.ts.
NgBackend will start making a *GET* request to the defined endpoint.

**Options**

| Name                 | Type    | Required | Description                                                                                                                                                                       |
|----------------------|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| path                 | string  | yes      | Url path that page must match (i.e. dashboard => www.mywebsite.com/dashboard)                                                                                                     |
| type                 | string  | yes      | Defines which type of component the page must load. (**dashboard**,** list**, **form**). It's also possibile to define a **group** type to create multi-level menu in the sidebar |
| params               | Object  | yes      | Component params                                                                                                                                                                  |
| params.menu          | Object  | yes      | Options related with the menu                                                                                                                                                     |
| params.menu.title    | string  | yes      | Title that will be displayed in the sidebar menu and as page title                                                                                                                |
| params.menu.icon     | string  | no       | Icon that will be displayed in the sidebar menu. (All icons available [here](http://ionicons.com/)                                                                                |
| params.menu.sidebar  | boolean | yes      | Show/hide page in the sidebar menu                                                                                                                                                |
| params.menu.selected | boolean | no       | Defines if the page must be selected when page loads                                                                                                                              |
| params.menu.expanded | boolean | no       | Only if type = **group**, defines if the sub-menu of the group must be expanded when page loads                                                                                   |
| params.menu.order    | number  | no       | Defines the order in which menu items will be displayed                                                                                                                           |
| api                  | Object  | yes      | Object that defines api parameters for the component                                                                                                                              |
| api.name             | string  | yes      | Api name defined in app.config.ts                                                                                                                                                 |

Example:

```json
[
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
        "path": "users",
        "type": "group",
        "params": {
          "menu": {
            "title": "Users",
            "icon": "ion-person",
            "sidebar": true,
            "selected": false,
            "expanded": true,
            "order": 100
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
              }
            }
          }
        ]
      }
    ]
  }
]
```


# Components

## List

To create a list page, you must define the structure in the setup JSON.

**Table params**

| Name                | Type    | Required | Description                                         |
|---------------------|---------|----------|-----------------------------------------------------|
| table               | Object  | yes      | Table object that defines its structure             |
| table.actions       | Object  | yes      | Actions object that defines table possible actions  |
| actions.columnTitle | string  | yes      | Column title                                        |
| actions.position    | string  | yes      | Defines where to show table actions (left or right) |
| actions.add         | boolean | yes      | Enable/disable add action                           |
| actions.edit        | boolean | yes      | Enable/disable edit action                          |
| table.columns       | Array   | yes      | Structure of the table columns                      |
| table.columns[KEY]  | string  | yes      | Key name of the field                               |

**Column params**

| Name                       | Type            | Required | Description                                                                                                                                            |
|----------------------------|-----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| title                      | string          | yes      | Column title (it appears on top of the table)                                                                                                          |
| type                       | string          | yes      | Column type (boolean, number, string)                                                                                                                  |
| filter                     | Object | false  | no       | Column filter, if false no filter will be applied to the column. If not defined, base filter (text) will be applied                                    |
| filter.type                | string          | no       | Defines the filter type if it mustn't be text. Possibile values are **checkbox** for boolean values or **list** to create a filter with a select-input.|
| filter.config              | Object          | no       | Required only if filter.type = list                                                                                                                    |
| filter.config.selectText   | string          | no       | Select placeholder where no value is selected                                                                                                          |
| filter.config.dataEndpoint | string          | no       | Data endpoint (full url) to call to retrieve data to populate select options                                                                           |

Example

```json
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
                     "dataEndpoint": "http://beta.json-generator.com/api/json/get/4yhx6nC6z"
                  }
               }
            },
            "firstName": {
               "title": "First Name",
               "type": "string",
               "filter": {
                  "type": "list",
                  "config": {
                     "selectText": "Select...",
                     "dataEndpoint": "http://beta.json-generator.com/api/json/get/4JAQ2206z"
                  }
               }
            },
            "id": {
               "title": "ID",
               "type": "number"
            }
         }
      }
   }
}
```

## Forms

To create a form page, you must define the structure in the setup JSON.

**Form params**

| Name                 | Type    | Required | Description                                                                                                                                                                       |
|----------------------|---------|----------|-------------------------------------------------------------|
| fields               | Array   | yes      | Array that contains all the fields that the form must render|  

**Field params**   

| Name                 | Type            | Required | Available values                                                         | Description                                                                             |
|----------------------|-----------------|----------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| type                 | string          | yes      | **text**, **email**, **checkbox**,  **select**, **date**, **date_range**, **password** | Defines the input type of the form field                                  |
| key                  | string          | yes      |                                                                          | Key that identifies that field in the form                                              |
| label                | string          | yes      |                                                                          | Label                                                                                   |
| placeholder          | string          | no       |                                                                          | Placeholder                                                                             |
| value                | string,  number | no       |                                                                          | Input value                                                                             |
| description          | string          | no       |                                                                          | Description of the field                                                                |
| class                | string          | no       |                                                                          | Css class of the field                                                                  |
| validators           | Object          | no       |                                                                          | Object that handle controls to evaluate the field in the form                           |
| validators.required  | boolean         | no       | true, false                                                              | Defines if that field is required or not                                                |
| validators.minLength | number          | no       |                                                                          | Only available for type text and email, defines a minLength                             |
| validators.maxLength | number          | no       |                                                                          | Only available for type text and email, defines a maxLength                             |
| validator.pattern    | string          | no       |                                                                          | Only available for type text and email, defines a pattern that input value must respect |
| validator.min        | number          | no       |                                                                          | Only available for type number, defines a min number                                    |
| validator.max        | number          | no       |                                                                          | Only available for type number, defines a max number                                    |     

## Form field types

Every type has the default options of the above table, and for some types it's possible to define other properties

### Text

*Type* : **text**

Simple input text field

Example:

```json
{
	"type": "text",
	"key": "firstName",
	"label": "First name",
	"placeholder": "Insert first name here...",
	"class": "col-sm-6",
	"validators": {
		"required": true,
		"minLength": 4,
		"maxLength": 30
	}
}
```

### Textarea

*Type*: **textarea**

When creating a textarea input, is possible to define if it will be a rich text editor (*tinymce*) or a simple textarea.

**Options**

| Name            | Type    | Required | Description                                                         |
|-----------------|---------|----------|---------------------------------------------------------------------|
| options         | Object  | yes      | Options object                                                      |
| options.tinyMce | boolean | no       | If set to true it will create a rich text editor as a textarea      |
| options.rows    | number  | no       | Rows of the textarea (it works only if **tinyMce** option is false) |
| options.cols    | number  | no       | Cols of the textarea (it works only if **tinyMce** option is false) |

Example:

```json
{
	"type": "textarea",
	"key": "textarea",
	"label": "Description",
    "validators": {
    	"required": true
	},
	"options": {
		"tinyMce": true
	}
}
```

### Url

*Type* : **url**

Input url field can be used when we are expecting a correct full url, like *http://website.com*

Example:

```json
{
	"type": "url",
	"key": "url",
	"label": "Url",
	"placeholder": "Insert full page url here...",
	"class": "col-sm-6",
	"validators": {
		"required": true
	}
}
```


### Number

*Type* : **number**

Simple input number field

Example:

```json
{
	"type": "number",
	"key": "number",
	"label": "Number",
	"placeholder": "Insert number here...",
	"validators": {
		"max": 10,
		"min": 5,
		"required": true
	}
}
```

### Email

*Type* : **email** 

Example:

```json
{
	"type": "email",
	"key": "email",
	"label": "Email",
	"placeholder": "Insert email here...",
	"class": "col-sm-12",
	"validators": {
		"required": true
	}
}
```

### Password

*Type* : **password**

For type password, it's possible to add the **confirm** option, it will create another field and handle password matching.

**Confirm options**

| Name         | Type   | Required | Description                                          |
|--------------|--------|----------|------------------------------------------------------|
| key          | string | yes      | Key that identifies that field in the form           |
| label        | string | yes      | Label                                                |
| placeholder  | string | no       | Placeholder                                          |
| class        | string | no       | Css class of the field                               |
| errorMessage | string | yes      | Error message that appears when password don't match |

Example:

```json
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
		"key": "password_confirm",
		"label": "Confirm password",
		"placeholder": "Confirm password here...",
		"class": "col-sm-6",
		"errorMessage": "Password don't match"
	}
}
```

### Checkbox

*Type* : **checkbox**

**Params**

| Name         | Type    | Required | Description                                          |
|--------------|---------|----------|------------------------------------------------------|
| checked      | boolean | yes      | Defines if checkbox must be checked or not           |
| disabled     | boolean | yes      | Defines if checkbox must be disabled or not          |

Example

```json
{
	"type": "checkbox",
	"key": "checkbox",
  	"label": "Checkbox test",
	"class": "col-sm-12",
	"checked": true,
	"disabled": false
}
```

### Date picker

*Type* : **date**

**Options**

| Name         | Type    | Required | Description                                                                         |                                      
|--------------|---------|----------|-------------------------------------------------------------------------------------|
| dateFormat   | string  | yes      | Defines the dateFormat that the picker must have ('dd-mm-yyyy', 'dd/mm/yyyy',...)   |

*Note*: if you set a default value with the **value** option, it must respect the *mm/dd/yyyy* standard format

Example: 

```json
{
	"type": "date",
	"key": "date",
	"dateFormat": "dd/mm/yyyy",
	"value": "12/24/2018",
	"label": "Select a date",
	"class": "col-sm-12",
	"validators": {
		"required": true
	}
}
```

### Date range picker

*Type* : **date_range**

**Options**

| Name         | Type    | Required | Description                                                                         |                                      
|--------------|---------|----------|-------------------------------------------------------------------------------------|
| dateFormat   | string  | yes      | Defines the dateFormat that the picker must have ('dd-mm-yyyy', 'dd/mm/yyyy',...)   |

*Note*: if you set a default value with the **value** option, it must be an object respecting the following format (and values must respect the *mm/dd/yyyy* standard format)


```json
{
	"value": {
		"startDate": "06/25/2016",
		"endDate": "04/08/2017"
	}
}
```

Example: 

```json
{
	"type": "date_range",
	"key": "date_range",
	"value": {
    	"startDate": "12/07/2012",
    	"endDate": "12/07/2017"
    },
	"label": "Select a date range",
	"class": "col-sm-12",
	"validators": {
		"required": true
	}
}
```

### Select

*Type* : **select**

| Name     | Type       | Required | Description                                                                  |
|----------|------------|----------|------------------------------------------------------------------------------|
| options  | **string** | yes      | Data endpoint (full url) to call to retrieve data to populate select options |
| options  | **Array**  | yes      | Array that contains the select options                                       |
| multiple | boolean    | yes      | Defines if multiple choice is available or not                               |


For the options of the select, we have to define the **options.data** key, it can be an *Array* or a *string* that defines the data endpoint to retrieve the options.
The structure must be the following:

```json
[
	{
		"id": "option_id",
		"text": "option_text"
	}
]
```

Example:

```json
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
```

### Latitude and Longitude

*Type* : **lat_lng**

For this field type, we have to crate a different json structure.

**Latitude**

| Name            | Type   | Required | Description                                    |
|-----------------|--------|----------|------------------------------------------------|
| lat             | Object | yes      | Latitude object                                |
| lat.key         | string | yes      | Key that identifies latitude field in the form |
| lat.placeholder | string | no       | Latitude input placeholder                     |
| lat.label       | string | no       | Latitude input label                           |

**Longitude**

| Name            | Type   | Required | Description                                     |
|-----------------|--------|----------|-------------------------------------------------|
| lng             | Object | yes      | Longitude object                                |
| lng.key         | string | yes      | Key that identifies longitude field in the form |
| lng.placeholder | string | no       | Longitude input placeholder                     |
| lng.label       | string | no       | Longitude input label                           |

**Options**

| Name               | Type   | Required | Description           |
|--------------------|--------|----------|-----------------------|
| options            | Object | no       | Options object        |
| options.defaultLng | number | no       | Map default longitude |
| options.defaultLat | number | no       | Map default latitude  |
| options.mapZoom    | number | no       | Map zoom              |

**Marker**

| Name             | Type    | Required | Description                          |
|------------------|---------|----------|--------------------------------------|
| marker           | Object  | no       | Map marker object                    |
| marker.lat       | number  | no       | Marker latitude                      |
| marker.lng       | number  | no       | Marker longitude                     |
| marker.draggable | boolean | no       | Defines if marker can be drag or not |
| marker.label     | string  | no       | Marker label                         |

Example:

```json
{
	"type": "lat_lng",
	"lng": {
		"placeholder": "Insert longitude",
		"label": "Longitude",
		"key": "lng"
	},
	"lat": {
		"placeholder": "Insert latitude",
		"label": "Latitude",
		"key": "lat"
	}
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
	}
}
```

### File upload 

Type: **file**

For file upload, we have to define some options

| Name                      | Type    | Required | Description                                                    |
|---------------------------|---------|----------|----------------------------------------------------------------|
| options                   | Object  | yes      | File upload options                                            |
| options.dataEndpoint      | string  | yes      | Url where to upload files                                      |
| options.showUploadedFiles | boolean | yes      | If set to true, a list of the uploaded files will be displayed |
| options.multiple          | boolean | yes      | Define if multiple files can be selected                       |
| options.labels            | Object  | no      | Labels options                                                 |

For *options.labels* we have the following keys

| Name                 | Type   | Required | Description          |
|----------------------|--------|----------|----------------------|
| labels.upload        | string | no       | Upload button label  |
| labels.uploading     | string | no       | Uploading label      |
| labels.uploadedFiles | string | no       | Uploaded files label |

Example:

```json
{
  "key": "file",
  "type": "file",
  "label": "File upload",
  "validators": {
    "required": true
  },
  "options": {
    "dataEndpoint": "https:\/\/evening-anchorage-3159.herokuapp.com\/api\/",
    "showUploadedFiles": true,
    "multiple": true,
    "allowDrop": false,
    "labels": {
      "upload": "Carica",
      "uploading": "Sto caricando",
      "uploadedFiles": "File caricati"
    }
  }
}
```

### List details

Type: **list_details**

For list_details type, we have to define some options

| Name                  | Type   | Required | Description                                                                                                            |
|-----------------------|--------|----------|------------------------------------------------------------------------------------------------------------------------|
| options               | Object | yes      | List details options                                                                                                   |
| options.noDataMessage | string | no       | Label when list is empty                                                                                               |
| options.actionsTitle  | string | no       | Label for actions column                                                                                               |
| options.columns       | Object | yes      | Object that defines the columns of the table (max 2 fields) Params are the same as defined in [list](#listColumns) |

For the options of the select, we have to define the **options.data** key, it can be an *Array* or a *string* that defines the data endpoint to retrieve the options.

| Name                  | Type    | Required | Description                                                                  |
|-----------------------|---------|----------|------------------------------------------------------------------------------|
| options.data          | string  | yes      | Data endpoint (full url) to call to retrieve data to populate select options |
| options.data          | Array   | yes      | Array that contains the select options                                       |

In every case the structure of data must be the following:

```json
[
	{
		"id": "option_id",
		"text": "option_text"
	}
]
```

Example:

```json
{
  "key": "list-details",
  "type": "list_details",
  "placeholder": "Select friends",
  "label": "Friends",
  "validators": {
    "required": true
  },
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
      }
    },
    "data": [
      {
        "text": "John Doe",
        "id": 1
      },
      {
        "text": "Tim Cook",
        "id": 2
      }
    ]
  }
}
```



[Ng2Admin README.md](https://github.com/akveo/ng2-admin)