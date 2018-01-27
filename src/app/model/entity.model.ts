export class Entity {
    constructor() {}
}

export class Page extends Entity {
    dataList: Entity[];
    paging: Paging;
    
    constructor() {
        super();
    }
}

export class Paging {
    totalPages: number;
    totalElements: number;
    pageSize: number;
    pageNumber: number;
    sortedOrder: string;
    numberOfElements: number;
    first: boolean;
    last: boolean;
}

export class DBQueryParams {
    page?: number;
    pageSize?: number;
    pathParams?: string;
    queryParams?: {
        [key: string]: any;
    };  // eg: {email: 'abc@mail.com'}
    sortString?: string;  //'field,desc|asc'
}