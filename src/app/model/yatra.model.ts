import { Paging } from './paging.model';

export class Yatra {
    id: number;
    yatraName: string;
    yatraAddress: string;
    yatraType: string;
    yatraAdmin: number;
}

export class YatraPage {
    yatraList: Yatra[];
    paging: Paging;
}