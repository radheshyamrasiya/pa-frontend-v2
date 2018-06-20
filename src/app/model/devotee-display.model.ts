import {DevoteeMinPage} from './devotee.model';

export class DevoteeDisplayParams {
    showMore: boolean;
    displaySize: number;
    selectedDevoteeId: number;
    quickActionIcon: string;
    contents: DevoteeMinPage;
    displayActions: DevoteeDisplayAction[];
}

export class DevoteeDisplayAction {
    buttonText: string;
    buttonIcon: string;
}

