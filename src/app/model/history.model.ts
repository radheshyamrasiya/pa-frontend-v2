import { Entity, Page, Paging } from './entity.model';

export class History extends Entity{
    id: number;
    comment: string;
    rating: number;
    response: string;
    timeStamp: number;
    commentedByDevoteeId: number;
    commentedByDevoteeName: string;
    ratedDevoteeId: number;
    ratedDevoteeName: string;
}

export class HistoryPage extends Page{

}