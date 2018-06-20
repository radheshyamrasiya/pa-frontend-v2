import { DevoteeMin } from './devotee.model';
import { Page } from './entity.model';

export class AttendanceSpecific {
    attendanceDate: Date;
	programId: number;
    topic: string;
    attendanceId: {
        attendanceId: number;
        devoteeId: number;
    }[];
    devoteeList: DevoteeMin[];
}

//This page will always have only one record
//That one record will have a list of attendanIds and devotees
//The page info is corresponding to these lists
export class AttendanceSpecificPage extends Page {
    
}