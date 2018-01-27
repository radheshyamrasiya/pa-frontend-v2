import { Entity, Page, Paging } from './entity.model';

export class ProgramAreaSubscription extends Entity{
    id: number;
    programId: number;
    countryCode: string;
    zipPostalCode: string;
}

export class ProgramAreaSubscriptionPage extends Page{
    
}