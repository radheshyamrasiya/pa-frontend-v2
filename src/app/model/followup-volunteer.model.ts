import { Entity, Page, Paging } from './entity.model';

export class FollowupVolunteer extends Entity{
    id: number;
    programId: number;
    devoteeId: number;
    programName: string;
    programArea: string;
    devoteeName: string;
}

export class FollowupVolunteerPage extends Page{

}