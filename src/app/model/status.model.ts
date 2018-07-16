export enum StatusType {
    SUCCESS,
    ERROR,
    INFO,
}

export class Status {
    messageId: number;
    message: string;
    type: StatusType;
    valid: true;

    constructor(message: string, type: StatusType) {
        this.message = message;
        this.type = type;
        this.messageId = Date.now();
    }

    getStatusString(): string {
        switch(this.type) {
            case StatusType.SUCCESS: return "success";
            case StatusType.INFO: return "info";
            case StatusType.ERROR: return "danger";
            default: return "info";
        }
    }
}