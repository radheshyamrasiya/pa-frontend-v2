import { Paging } from './paging.model';

export class FollowupVolunteer {
    id: number;
    programId: number;
    devoteeId: number;
    programName: string;
    devoteeName: string;
}

export class FollowupVolunteerPage {
    followupVolunteerList: FollowupVolunteer[];
    paging: Paging;
}