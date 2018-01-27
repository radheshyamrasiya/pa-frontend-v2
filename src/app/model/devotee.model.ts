import { Entity, Page, Paging } from './entity.model';

export class DevoteeMin extends Entity {
    id: number;
    name: string;
    phone: string;
    area: string;
    pin: string;
}

export class DevoteeMinPage extends Page{

}

export class Devotee extends Entity {
    id: number;
    
    //Personal
    legalName: string;
    initiatedName: string;
    displayName: string;
    dob: Date;
    gender: string;
    maritalStatus: string;
    familyInfo: string;
    //<Update Important Dates Button>
    
    //Professional
    education: string;
    occupation: string;
    organization: string;
    designation: string;
    //incomeScale; TODO later
    
    //Contact
    smsPhone: string; 
    area: string;
    address: string;
    countryCode: string;
    zipPostalCode: string;
    email: string;
    //country TODO later
    //pin TODO later
    
    //Spiritual
    preferredLanguage: string;
    booksRead: string;
    monthlyContribution: number;
    sikshaLevel: string;
    
    //General
    description: string;

    //Labels - Non Display
    capturedBy: number;
    capturedFor: string;
    introDate: string;
}