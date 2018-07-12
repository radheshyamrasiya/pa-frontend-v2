import { Entity, Page, Paging } from './entity.model';

export class Followup extends Entity{
	id: number;
	followupForSessionId: number;
	followupForSessionDate: Date;
	followupForSessionTopic: string;
	volunteerId: number;
	attendeeId: number;
	programId: number;
	response: string;
	comment: string;  //Not Used
	rating: number;  //Not Used
	timestamp: number;
	taskStatus: number;
	volunteerName: string;
	attendeeName: string;
	programName: string;
}

export class FollowupPage extends Page{

}