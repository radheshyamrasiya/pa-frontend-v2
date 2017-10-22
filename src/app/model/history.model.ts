import { Paging } from './paging.model';

export class History {
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

export class HistoryPage {
    historyList: History[];
    paging: Paging;
}