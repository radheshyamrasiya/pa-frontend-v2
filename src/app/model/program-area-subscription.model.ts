import { Paging } from './paging.model';

export class ProgramAreaSubscription {
    id: number;
    programId: number;
    countryCode: string;
    zipPostalCode: string;
}

export class ProgramAreaSubscriptionPage {
    programAreaSubscriptionList: ProgramAreaSubscription[];
    paging: Paging;
}