import { Entity, Page, Paging } from './entity.model';

export class Yatra extends Entity {
    id: number;
    yatraName: string;
    yatraAddress: string;
    yatraType: string;
    yatraAdmin: number;
}

export class YatraPage extends Page {
    
}