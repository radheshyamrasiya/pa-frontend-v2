export class HistoryRequestQuery {
    id: number;
    commentedByDevoteeId: number;
    ratedDevoteeId: number;
    rating: number;
    response: string;
    comment: string;
    timeStamp: string;
}

export class HistoryResponseQuery {
    id: number;
    commentedByDevoteeId: number;
    commentedByDevoteeName: string;
    ratedDevoteeId: number;
    ratedDevoteeName: string;
    rating: number;
    response: string;
    comment: string;
    timeStamp: number;
}