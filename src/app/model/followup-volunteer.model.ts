import { Entity, Page, Paging } from './entity.model';

export class FollowupVolunteer extends Entity{
    id: number;
    programId: number;
    devoteeId: number;
    programName: string;
    devoteeName: string;
    followupVolunteer: boolean;
}

export class FollowupVolunteerPage extends Page{

}