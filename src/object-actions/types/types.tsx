

//---OBJECT-ACTIONS-TYPE-SCHEMA-STARTS---//
export interface Users {
	_type: string
	is_active?: boolean
	is_staff?: boolean
	last_login?: string
	date_joined?: string
	username?: string
	first_name?: string
	last_name?: string
	readonly id: number;
	phone: string;
	email: string;
	billing_name?: string | null;
	billing_address?: string | null;
	delivery_address?: string | null;
}
export interface Suppliers {
	readonly id: number | string
	_type: string
	created_at: number
	modified_at: number
	author?: number
	url_alias?: string | null;
	name: string;
	photo?: string | null;
	address?: string | null;
	website?: string | null;
}
export interface Ingredients {
	readonly id: number | string
	_type: string
	created_at: number
	modified_at: number
	author?: number
	name: string;
	image?: string | null;
	supplier?: RelEntity | null;
	seasonal?: boolean | null;
	in_season_price?: number | null;
	out_of_season_price?: number | null;
}
export interface Tags {
	readonly id: number | string
	_type: string
	created_at: number
	modified_at: number
	author?: number
	name: string;
	icon?: string | null;
}
export interface Meals {
	readonly id: number | string
	_type: string
	created_at: number
	modified_at: number
	author?: number
	url_alias?: string | null;
	title: string;
	description: string;
	bld: string;
	photo?: string[] | null;
	internal_cost?: number | null;
	public_price?: number | null;
    servings?: number; // only a CLIENT SIDE quantity of this meal in my cart
	tags?: RelEntity | null;
	ingredients?: RelEntity | null;
	suppliers?: RelEntity | null;
}
export interface Plans {
	readonly id: number | string
	_type: string
	created_at: number
	modified_at: number
	author?: number
	url_alias: string;
	name: string;
	description?: string | null;
	meals: RelEntity;
	price?: number | null;
	date?: string | null;
}
export interface OrderItems {
	_type: string
	created_at: number
	modified_at: number
	author?: number
	readonly id: number;
	date: string;
	delivery_date: string;
	meal?: RelEntity | null;
	meal_menu?: RelEntity | null;
	servings: number;
}
export interface Orders {
	_type: string
	created_at: number
	modified_at: number
	author?: number
	readonly id: number;
	customer: RelEntity;
	created_date: string;
	start_date: string;
	final_price: number;
	delivery_instructions?: string | null;
	customizations: string;
	glass_containers?: boolean | null;
	recurring?: boolean | null;
	order_items: RelEntity[];
	status: string;
}
//---OBJECT-ACTIONS-TYPE-SCHEMA-ENDS---//



//---OBJECT-ACTIONS-API-RESP-STARTS---//
export interface RelEntity {
    id: string | number;
    str: string;
    _type: string;
    img?: string;
    entity?: EntityTypes
}

export interface NewEntity {
    id: number | string
}

export type EntityTypes = Users | Suppliers | Ingredients | Tags | Meals | Plans | OrderItems | Orders;

export interface ApiListResponse<T = EntityTypes> {
    count: number;
    offset: number;
    limit: number;
    meta: any;
    error: string | null;
    results: T[]
}

export function getProp<T extends EntityTypes, K extends keyof T>(entity: EntityTypes, key: string): T[K] | null {
    // @ts-ignore
    if (key in entity) return entity[key]
	return null;
}
//---OBJECT-ACTIONS-API-RESP-ENDS---//



//---OBJECT-ACTIONS-NAV-ITEMS-STARTS---//
export interface NavItem {
        name: string;
        screen: string;
        api: string;
        icon?: string;
        type: string;
        search_fields: string[];

}
export const NAVITEMS: NavItem[] = [
  {
    "name": "Users",
    "type": "Users",
    "api": "/api/users",
    "screen": "/users",
    "search_fields": [
      "first_name",
      "last_name"
    ]
  },
  {
    "name": "Suppliers",
    "type": "Suppliers",
    "api": "/api/suppliers",
    "screen": "/suppliers",
    "search_fields": [
      "name"
    ]
  },
  {
    "name": "Ingredients",
    "type": "Ingredients",
    "api": "/api/ingredients",
    "screen": "/ingredients",
    "search_fields": [
      "name"
    ]
  },
  {
    "name": "Tags",
    "type": "Tags",
    "api": "/api/tags",
    "screen": "/tags",
    "search_fields": [
      "name"
    ]
  },
  {
    "name": "Meals",
    "type": "Meals",
    "api": "/api/meals",
    "screen": "/meals",
    "search_fields": [
      "title"
    ]
  },
  {
    "name": "Plans",
    "type": "Plans",
    "api": "/api/plans",
    "screen": "/plans",
    "search_fields": [
      "name"
    ]
  },
  {
    "name": "Order Items",
    "type": "OrderItems",
    "api": "/api/order_items",
    "screen": "/order_items",
    "search_fields": [
      "meal__title",
      "meal_menu__name"
    ]
  },
  {
    "name": "Orders",
    "type": "Orders",
    "api": "/api/orders",
    "screen": "/orders",
    "search_fields": []
  }
]
//---OBJECT-ACTIONS-NAV-ITEMS-ENDS---//



//---OBJECT-ACTIONS-TYPE-CONSTANTS-STARTS---//
export interface FieldTypeDefinition {
    machine: string;
    singular: string;
    plural: string;
    data_type: string;
    field_type: string;
    cardinality?: number;
    relationship?: string;
    required?: boolean;
    default?: string;
    example?: string;
    options?: { label: string; id: string; }[];
}
interface ObjectOfObjects {
    [key: string]: { [key: string]: FieldTypeDefinition };
}
export const TypeFieldSchema: ObjectOfObjects = {
  "Users": {
    "id": {
      "machine": "id",
      "singular": "ID",
      "plural": "IDs",
      "field_type": "id_auto_increment",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "phone": {
      "machine": "phone",
      "singular": "Phone",
      "plural": "Phones",
      "field_type": "phone",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "email": {
      "machine": "email",
      "singular": "Email",
      "plural": "Emails",
      "field_type": "email",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "billing_name": {
      "machine": "billing_name",
      "singular": "Billing Name",
      "plural": "Billing Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "billing_address": {
      "machine": "billing_address",
      "singular": "Billing Addres",
      "plural": "Billing Address",
      "field_type": "address",
      "data_type": "string",
      "cardinality": Infinity,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "delivery_address": {
      "machine": "delivery_address",
      "singular": "Delivery Address",
      "plural": "Delivery Address",
      "field_type": "address",
      "data_type": "string",
      "cardinality": Infinity,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "Suppliers": {
    "url_alias": {
      "machine": "url_alias",
      "singular": "URL Alias",
      "plural": "URL Alias",
      "field_type": "slug",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "name",
      "required": false,
      "example": ""
    },
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "photo": {
      "machine": "photo",
      "singular": "Photo",
      "plural": "Photos",
      "field_type": "image",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": "media/suppliers"
    },
    "address": {
      "machine": "address",
      "singular": "Addres",
      "plural": "Address",
      "field_type": "address",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "website": {
      "machine": "website",
      "singular": "Website",
      "plural": "Websites",
      "field_type": "url",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "Ingredients": {
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "image": {
      "machine": "image",
      "singular": "Image",
      "plural": "Images",
      "field_type": "image",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": "media/ingredients"
    },
    "supplier": {
      "machine": "supplier",
      "singular": "Supplier",
      "plural": "Suppliers",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "relationship": "Suppliers",
      "default": "",
      "required": false,
      "example": ""
    },
    "seasonal": {
      "machine": "seasonal",
      "singular": "Seasonal",
      "plural": "Seasonals",
      "field_type": "boolean",
      "data_type": "boolean",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "in_season_price": {
      "machine": "in_season_price",
      "singular": "In season Price",
      "plural": "In season Prices",
      "field_type": "decimal",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "out_of_season_price": {
      "machine": "out_of_season_price",
      "singular": "Out of season price",
      "plural": "Out of season prices",
      "field_type": "decimal",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "Tags": {
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "icon": {
      "machine": "icon",
      "singular": "Icon",
      "plural": "Icons",
      "field_type": "image",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": "media/ingredients"
    }
  },
  "Meals": {
    "url_alias": {
      "machine": "url_alias",
      "singular": "URL Alias",
      "plural": "URL Alias",
      "field_type": "slug",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "title",
      "required": false,
      "example": ""
    },
    "title": {
      "machine": "title",
      "singular": "Title",
      "plural": "Titles",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "description": {
      "machine": "description",
      "singular": "Description",
      "plural": "Descriptions",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "bld": {
      "machine": "bld",
      "singular": "BLD",
      "plural": "BLDs",
      "field_type": "enum",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": "['breakfast', 'lunch', 'dinner', 'desert', 'snack']",
      "options": [
        {
          "label": "Breakfast",
          "id": "breakfast"
        },
        {
          "label": "Lunch",
          "id": "lunch"
        },
        {
          "label": "Dinner",
          "id": "dinner"
        },
        {
          "label": "Desert",
          "id": "desert"
        },
        {
          "label": "Snack",
          "id": "snack"
        }
      ]
    },
    "photo": {
      "machine": "photo",
      "singular": "Photo",
      "plural": "Photos",
      "field_type": "media",
      "data_type": "string",
      "cardinality": 3,
      "relationship": "",
      "default": "",
      "required": false,
      "example": "media/calendar"
    },
    "internal_cost": {
      "machine": "internal_cost",
      "singular": "Internal Cost",
      "plural": "Internal Costs",
      "field_type": "decimal",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "public_price": {
      "machine": "public_price",
      "singular": "Public Price",
      "plural": "Public Prices",
      "field_type": "decimal",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "16",
      "required": false,
      "example": ""
    },
    "tags": {
      "machine": "tags",
      "singular": "Tag",
      "plural": "Tags",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "relationship": "Tags",
      "default": "",
      "required": false,
      "example": ""
    },
    "ingredients": {
      "machine": "ingredients",
      "singular": "Ingredient",
      "plural": "Ingredients",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "relationship": "Ingredients",
      "default": "",
      "required": false,
      "example": ""
    },
    "suppliers": {
      "machine": "suppliers",
      "singular": "Supplier",
      "plural": "Suppliers",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "relationship": "Suppliers",
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "Plans": {
    "url_alias": {
      "machine": "url_alias",
      "singular": "URL Alias",
      "plural": "URL Alias",
      "field_type": "slug",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "name",
      "required": true,
      "example": ""
    },
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "description": {
      "machine": "description",
      "singular": "Description",
      "plural": "Descriptions",
      "field_type": "textarea",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "meals": {
      "machine": "meals",
      "singular": "Meal",
      "plural": "Meals",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "relationship": "Meals",
      "default": "",
      "required": true,
      "example": ""
    },
    "price": {
      "machine": "price",
      "singular": "Price",
      "plural": "Prices",
      "field_type": "price",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": "USD"
    },
    "date": {
      "machine": "date",
      "singular": "Date",
      "plural": "Dates",
      "field_type": "date",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "OrderItems": {
    "id": {
      "machine": "id",
      "singular": "ID",
      "plural": "IDs",
      "field_type": "id_auto_increment",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "date": {
      "machine": "date",
      "singular": "Date",
      "plural": "Dates",
      "field_type": "date",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "delivery_date": {
      "machine": "delivery_date",
      "singular": "Delivery Date",
      "plural": "Delivery Dates",
      "field_type": "date",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "meal": {
      "machine": "meal",
      "singular": "Meal",
      "plural": "Meals",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "relationship": "Meals",
      "default": "",
      "required": false,
      "example": ""
    },
    "meal_menu": {
      "machine": "meal_menu",
      "singular": "Meal Menu",
      "plural": "Meal Menus",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "relationship": "Plans",
      "default": "",
      "required": false,
      "example": ""
    },
    "servings": {
      "machine": "servings",
      "singular": "Serving",
      "plural": "Servings",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "1",
      "required": true,
      "example": ""
    }
  },
  "Orders": {
    "id": {
      "machine": "id",
      "singular": "ID",
      "plural": "IDs",
      "field_type": "id_auto_increment",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "customer": {
      "machine": "customer",
      "singular": "Customer",
      "plural": "Customers",
      "field_type": "user_account",
      "data_type": "RelEntity",
      "cardinality": 1,
      "relationship": "Users",
      "default": "",
      "required": true,
      "example": ""
    },
    "created_date": {
      "machine": "created_date",
      "singular": "Created Date",
      "plural": "Created Dates",
      "field_type": "date",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "start_date": {
      "machine": "start_date",
      "singular": "Start Date",
      "plural": "Start Dates",
      "field_type": "date",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "final_price": {
      "machine": "final_price",
      "singular": "Final Price",
      "plural": "Final Prices",
      "field_type": "decimal",
      "data_type": "number",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "delivery_instructions": {
      "machine": "delivery_instructions",
      "singular": "Delivery Instructions",
      "plural": "Delivery Instructions",
      "field_type": "textarea",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": false,
      "example": ""
    },
    "customizations": {
      "machine": "customizations",
      "singular": "Customizations",
      "plural": "Customizations",
      "field_type": "textarea",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "",
      "required": true,
      "example": ""
    },
    "glass_containers": {
      "machine": "glass_containers",
      "singular": "Glass Container",
      "plural": "Glass Containers",
      "field_type": "boolean",
      "data_type": "boolean",
      "cardinality": 1,
      "relationship": "",
      "default": "0",
      "required": false,
      "example": ""
    },
    "recurring": {
      "machine": "recurring",
      "singular": "Recurring",
      "plural": "Recurrings",
      "field_type": "boolean",
      "data_type": "boolean",
      "cardinality": 1,
      "relationship": "",
      "default": "0",
      "required": false,
      "example": ""
    },
    "order_items": {
      "machine": "order_items",
      "singular": "Order Item",
      "plural": "Order Items",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "relationship": "OrderItems",
      "default": "",
      "required": true,
      "example": ""
    },
    "status": {
      "machine": "status",
      "singular": "Status",
      "plural": "Status",
      "field_type": "enum",
      "data_type": "string",
      "cardinality": 1,
      "relationship": "",
      "default": "unpaid",
      "required": true,
      "example": "['paid', 'cancelled', 'unpaid']",
      "options": [
        {
          "label": "Paid",
          "id": "paid"
        },
        {
          "label": "Cancelled",
          "id": "cancelled"
        },
        {
          "label": "Unpaid",
          "id": "unpaid"
        }
      ]
    }
  }
}
//---OBJECT-ACTIONS-TYPE-CONSTANTS-ENDS---//

