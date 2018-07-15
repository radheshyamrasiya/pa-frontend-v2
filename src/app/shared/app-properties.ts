export enum LoginStatus {
    loggedIn,
    loggedOut,
};

export const connectionProperties = {
    baseUrl: 'http://localhost:8080',
    login: '/login',

    //Enums
    enums: '/enumModels',

    //User
    changePassword: '/changePassword',

    // User Account
    createUserAccount: '/userAccount',
    resetPassword: '/resetPassword',
    getUserAccount: '/userAccount',

    //Devotee
    capture: '/devotees',
    devotees: '/devotees',
    devoteeList: '/devoteesPage',
    devoteesByEmailId: '/devoteeByEmail',
    devoteesByPhone: '/devoteeByPhone', //phone no
    myCapturedListUrl: '/myCapturedListPage',
    devoteeGlobalSearch: '/devoteeGlobalSearchPage',

    //History
    writeHistory: '/devoteeHistory',
    historyOf: '/devoteeHistoryPageByRatedDevotee',

    //Yatra
    createYatra: '/yatra',
    getYatra: '/yatra',
    updateYatra: '/yatra',
    listYatra: '/yatraPage',
    listYatraByAdmin: '/yatraPageByAdminId',

    //Program
    listProgram: '/programPage',
    listProgramByMentor: '/programPageByMentorId',
    listProgramByYatra: '/programPageByYatraId',
    getProgram: '/programs',
    updateProgram: '/programs',
    createProgram: '/programs',
    createProgramSession: '/programSession',
    getSessionByProgramAndDate: '/programSessionOfProgramByDate', //program id and date
    getSessionByProgram: '/programSessionByProgramPage', //programId
    getProgramAttendance: '/programAttendanceBySessionPage', //Session id
    markAttendance: '/programAttendance',
    removeAttendance: '/programAttendance',

    //Program Area Subscription
    listProgramAreaSubscription: '/programAreaSubscriptionByProgramPage',
    createProgramAreaSubscription: '/programAreaSubscription',
    deleteProgramAreaSubscription: '/programAreaSubscriptionWithProgram',

    //Program Assignment
    listProgramAssignment: '/programAssignmentByProgramPage',
    createProgramAssignment: '/programAssignment',
    deleteProgramAssignment: '/programAssignment',

    //Followup Volunteer
    listFollowupVolunteer: '/followUpVolunteerByProgramPage',
    listProgramsByVolunteer: '/followUpProgramsByVolunteerPage', //volunteer id
    createFollowupVolunteer: '/followUpVolunteer',
    deleteFollowupVolunteer: '/followUpVolunteer',

    //FollowupAssignment
    allFollowups: '/followUpAssignmentPage',
    followupAssignmentByProgram: '/followUpAssignmentsByProgramPage',
    myFollowUpDevoteeList: '/followUpAssignmentByVolunteerPage', // /volunteerId
    myFollowUpListByProgram: '/followUpAssignmentAttendeesForVolunteerByProgramPage', // /volunteerId/programId
    createFollowup: '/followUpAssignment',
    deleteFollowup: '/followUpAssignment', // /id
    deleteFollowupAssignmentsOfProgram: '/followUpAssignmentDeleteForProgram', //programId
    myFollowupPrograms: '/followUpProgramsForVolunteerPage', // /volunteerId - Returns list of programs
    autoAssignFollowup: '/followUpAssignment/auto', // programId

    //Followup Record
    getSpecificFollowupRecord: '/specificFollowUpRecord', // programId, attendeeId, volunteerId
    getFollowupRecordById: '/followUp', // followupId
    createFollowupRecord: '/followUp',
    updateFollowupRecord: '/followUp', // followupId
    deleteFollowupRecordOfProgram: '/deleteFollowUpOfProgram', //programId

    //Reports
    followupReport: '/followUpReport', //mentorId/programId - programId can be 0 for all program
    attendanceReport: '/programAttendanceGeneralReport', //programId
};

export const callResponse = {
    coming: "COMING",
    notComing: "NOT_COMING",
    doubtful: "DOUBTFUL",
    travelOut: "TRAVELLING_OUTSTATION",
    callAgain: "CALL_AGAIN",
    wrongNumber: "WRONG_NUMBER",
    removeMe: "REMOVE_ME",
    permanentlyShifted: "PERMANENTLY_SHIFTED",
};

export const routeConstants = {
    dashboard: 'dashboard',
    //Login Feature
    login: 'login',
    welcome: 'welcome',
    manageUserAccount: 'manage-user-account',
    //Devotee Feature
    devoteeProfile: 'devotee-profile',
    history: 'devotee-history',
    writeComment: 'write-comment',
    paramDevoteeId: 'devoteeId',
    //Capture Feature
    captureContact: 'capture-contact',
    capturedList: 'captured-list',
    paramsYatraId: 'yatraId',
    //Super Admin
    superAdmin: 'super-admin',
    createYatra: 'create-yatra',
    listYatra: 'list-yatra',
    //Yatra
    yatra: 'yatra',
    createProgram: 'create-program',
    editProgram: 'edit-program',
    listProgram: 'list-program',
    paramsYatraAdminId: 'yatraAdminId',
    updateProgram: 'update-program',
    //Program
    manageProgram: 'manage-program',
    manageSessions: 'manage-sessions',
    addParticipants: 'add-participants',
    addFollowupVolunteers: 'add-followup-volunteers',
    assignFollowups: 'assign-followups',
    markAttendance: 'mark-attendance',
    //Followup Feature
    followup: 'followup',
    followupProgram: 'followup-program',
    callResponse: 'call-response',
    paramsVolunteerId: 'volunteerId',
    //Program Feature
    myPrograms: 'my-programs',
    paramsProgramId: 'programId',
    //User related
    user: 'user',
    changePassword: 'edit-password',
    editProfile: 'edit-profile',
};

//For history comments
export const colorCode = [
    "text-white bg-secondary", //value 0
    "text-white bg-danger", //value 1
    "text-white bg-danger", //value 2
    "text-white bg-warning", //value 3
    "text-white bg-info", //value 4
    "text-white bg-success", //value 5
];

//For status service
export const statusType = {
    info: "alert alert-secondary",
    success: "alert alert-success",
    error: "alert alert-danger"
}

export const welcomeMessage = "Hare Krishna! Welcome to Preaching Assistant";
export const greeting = "Hare Krishna, ";

export const dbRequestPageSize = 5;
